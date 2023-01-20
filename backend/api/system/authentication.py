from flask import current_app, request
from flask_restful import Resource
from oauthlib.oauth2.rfc6749.errors import InvalidGrantError

from backend import osm, osm_teams
from backend.config import EnvironmentConfig
from backend.services.users.authentication_service import (
    AuthenticationService,
    AuthServiceError,
)


class SystemAuthenticationLoginAPI(Resource):
    def get(self):
        """
        Redirects user to OSM to authenticate
        ---
        tags:
          - system
        produces:
          - application/json
        parameters:
            - in: query
              name: redirect_uri
              description: Route to redirect user once authenticated
              type: string
              default: /take/me/here
        responses:
          200:
            description: oauth2 params
        """
        redirect_uri = request.args.get(
            "redirect_uri", EnvironmentConfig.OAUTH_REDIRECT_URI
        )
        authorize_url = f"{EnvironmentConfig.OSM_SERVER_URL}/oauth2/authorize"
        state = AuthenticationService.generate_random_state()

        osm.redirect_uri = redirect_uri
        osm.state = state

        login_url, state = osm.authorization_url(authorize_url)
        return {"auth_url": login_url, "state": state}, 200


class OSMTeamsAuthenticationAPI(Resource):
    def get(self):
        """
        Returns URL to allow authentication in OSM Teams
        ---
        tags:
          - system
        produces:
          - application/json
        parameters:
            - in: query
              name: redirect_uri
              description: Route to redirect user once authenticated
              type: string
              default: /take/me/here
        responses:
          200:
            description: oauth2 params
        """
        authorize_url = f"{EnvironmentConfig.OSM_TEAMS_AUTH_URL}/hyauth/oauth2/auth"
        state = AuthenticationService.generate_random_state()
        osm_teams.state = state
        login_url, state = osm_teams.authorization_url(authorize_url)
        return {"auth_url": login_url, "state": state}, 200


class SystemAuthenticationCallbackAPI(Resource):
    def get(self):
        """
        Handles the OSM OAuth callback
        ---
        tags:
          - system
        produces:
          - application/json
        parameters:
            - in: query
              name: redirect_uri
              description: Route to redirect user once authenticated
              type: string
              default: /take/me/here
              required: false
            - in: query
              name: code
              description: Code obtained after user authorization
              type: string
              required: true
            - in: query
              name: email_address
              description: Email address to used for email notifications from TM.
              type: string
              required: false
        responses:
          302:
            description: Redirects to login page, or login failed page
          500:
            description: A problem occurred authenticating the user
          502:
            description: A problem occurred negotiating with the OSM API
        """

        token_url = f"{EnvironmentConfig.OSM_SERVER_URL}/oauth2/token"
        authorization_code = request.args.get("code", None)
        if authorization_code is None:
            return {"Subcode": "InvalidData", "Error": "Missing code parameter"}, 500

        email = request.args.get("email_address", None)
        redirect_uri = request.args.get(
            "redirect_uri", EnvironmentConfig.OAUTH_REDIRECT_URI
        )
        osm.redirect_uri = redirect_uri
        try:
            osm_resp = osm.fetch_token(
                token_url=token_url,
                client_secret=EnvironmentConfig.OAUTH_CLIENT_SECRET,
                code=authorization_code,
            )
        except InvalidGrantError:
            return {
                "Error": "The provided authorization grant is invalid, expired or revoked",
                "SubCode": "InvalidGrantError",
            }, 400
        if osm_resp is None:
            current_app.logger.critical("Couldn't obtain token from OSM.")
            return {
                "Subcode": "TokenFetchError",
                "Error": "Couldn't fetch token from OSM.",
            }, 502

        user_info_url = f"{EnvironmentConfig.OAUTH_API_URL}/user/details.json"
        osm_response = osm.get(user_info_url)  # Get details for the authenticating user

        if osm_response.status_code != 200:
            current_app.logger.critical("Error response from OSM")
            return {
                "Subcode": "OSMServiceError",
                "Error": "Couldn't fetch user details from OSM.",
            }, 502

        try:
            user_params = AuthenticationService.login_user(osm_response.json(), email)
            user_params["session"] = osm_resp
            return user_params, 200
        except AuthServiceError:
            return {"Error": "Unable to authenticate", "SubCode": "AuthError"}, 500


class OSMTeamsAuthenticationCallbackAPI(Resource):
    def get(self):
        """
        Handles the OSM Teams OAuth callback
        ---
        tags:
          - system
        produces:
          - application/json
        parameters:
            - in: query
              name: redirect_uri
              description: Route to redirect user once authenticated
              type: string
              default: /take/me/here
              required: false
            - in: query
              name: code
              description: Code obtained after user authorization
              type: string
              required: true
            - in: query
              name: email_address
              description: Email address to used for email notifications from TM.
              type: string
              required: false
        responses:
          302:
            description: Redirects to login page, or login failed page
          500:
            description: A problem occurred authenticating the user
          502:
            description: A problem occurred negotiating with the OSM API
        """

        token_url = f"{EnvironmentConfig.OSM_TEAMS_AUTH_URL}/hyauth/oauth2/token"
        authorization_code = request.args.get("code", None)
        if authorization_code is None:
            return {"Subcode": "InvalidData", "Error": "Missing code parameter"}, 500

        try:
            osm_teams_response = osm_teams.fetch_token(
                token_url=token_url,
                client_secret=EnvironmentConfig.OSM_TEAMS_CLIENT_SECRET,
                code=authorization_code,
            )
            print(osm_teams_response)
        except InvalidGrantError:
            return {
                "Error": "The provided authorization grant is invalid, expired or revoked",
                "SubCode": "InvalidGrantError",
            }, 400
        if osm_teams_response is None:
            current_app.logger.critical("Couldn't obtain token from OSM Teams.")
            return {
                "Subcode": "TokenFetchError",
                "Error": "Couldn't fetch token from OSM Teams.",
            }, 502

        try:
            return osm_teams_response, 200
        except AuthServiceError:
            return {"Error": "Unable to authenticate", "SubCode": "AuthError"}, 500


class SystemAuthenticationEmailAPI(Resource):
    def get(self):
        """
        Authenticates user owns email address
        ---
        tags:
          - system
        produces:
          - application/json
        parameters:
            - in: query
              name: username
              type: string
              default: thinkwhere
            - in: query
              name: token
              type: string
              default: 1234dvsdf
        responses:
            301:
                description: Will redirect to email validation page
            500:
                description: Internal Server Error
        """
        try:
            username = request.args.get("username")
            token = request.args.get("token")
            AuthenticationService.authenticate_email_token(username, token)

            return {"Status": "OK"}, 200
        except AuthServiceError:
            return {"Error": "Unable to authenticate", "SubCode": "AuthError"}, 403
        except Exception as e:
            error_msg = f"User GET - unhandled error: {str(e)}"
            current_app.logger.critical(error_msg)
            return {
                "Error": "Unable to authenticate",
                "SubCode": "InternalServerError",
            }, 500
