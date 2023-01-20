import React from 'react';
import { useLocation } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';

import messages from './messages';
import { Button, CustomButton } from '../button';
import { UserGroupIcon } from '../svgIcons';
import { useOSMTeams } from '../../hooks/UseOSMTeams';
import { useDebouncedCallback } from '../../hooks/UseThrottle';
import { createOSMTeamsLoginWindow } from '../../utils/login';

export const TeamSync = ({ osm_teams_id }) => {
  const osmteams_token = useSelector((state) => state.auth.osmteams_token);
    return (
        <div className="mb2 bg-white b--grey-light pa4 flex items-center justify-between">
          <div>
            <h3 className="f3 blue-dark mv2 fw6 db">
              <FormattedMessage {...messages.syncWithOSMTeams} />
            </h3>
            <div className="db">
              <FormattedMessage {...messages.osmTeamsIntegrationDescription} />
            </div>
          </div>
          {osmteams_token
            ? <SelectOSMTeamsModal osm_teams_id={osm_teams_id} />
            : <OSMTeamsAuthButton />
          }
        </div>
    );
};

export const SelectOSMTeamsModal = ({ osm_teams_id }) => {
  const osmteams_token = useSelector((state) => state.auth.osmteams_token);
  const myTeams = useOSMTeams(`Bearer ${osmteams_token}`);
  // const myTeams = {"data":[{"id":73,"name":"OSM Teams Developers","hashtag":null,"bio":null,"privacy":"private","require_join_request":false,"updated_at":"2022-11-28T12:06:20.724Z","created_at":"2022-05-06T16:10:18.452Z","location":null,"members":"7"},{"id":70,"name":"iD users","hashtag":null,"bio":null,"privacy":"private","require_join_request":false,"updated_at":"2022-11-28T12:06:20.724Z","created_at":"2022-05-06T16:10:18.452Z","location":null,"members":"7"},{"id":76,"name":"TM Engineers","hashtag":null,"bio":null,"privacy":"private","require_join_request":false,"updated_at":"2022-11-28T12:06:20.724Z","created_at":"2022-05-06T16:10:18.452Z","location":null,"members":"10"},{"id":1140,"name":"Wille Friends","hashtag":null,"bio":null,"privacy":"private","require_join_request":false,"updated_at":"2022-11-17T15:32:58.615Z","created_at":"2022-11-17T15:32:58.615Z","location":null,"members":"2"}],"pagination":{"total":2,"lastPage":1,"perPage":10,"currentPage":1,"from":0,"to":2}}
  return (
    <Popup
      trigger={
        <CustomButton
          className="pv2 ph3 ba b--red white bg-red fr mv1"
          onClick={() => {}}
        >
          <FormattedMessage {...messages.sync} />
        </CustomButton>
      }
      modal
      closeOnDocumentClick
      closeOnEscape
      onClose={() => { }}
    >
      {(close) => (
        <>
          <div className="db cf blue-dark ph2">
            {osm_teams_id
              ? (
                <div>list updated members list</div>
              ) : (
                <>
                  <h3><FormattedMessage {...messages.selectTeam} /></h3>
                  <div className='cf dib w-100'>
                    {myTeams?.data?.map((team) =>
                      <OSMTeamCard team={team} />
                    )}
                  </div>
                </>
              )
            }
          </div>
          <div className="db cf fr blue-dark pa2">
            <Button onClick={() => close()}>
              <FormattedMessage {...messages.cancel} />
            </Button>
          </div>
        </>
      )}
    </Popup>
  );
};

const OSMTeamCard = ({ team }) =>
  <div role="button" onClick={() => {}} className="w-50-ns w-100 dib">
    <div className="bg-white blue-dark br1 mv2 mh1 pv2 ph3 ba br1 b--grey-light shadow-hover">
      <div className="flex v-mid pr3">
        <div className="z-1 br-100 tc h2 w2 bg-blue-light white">
          <span className="relative w-50 dib">
            <UserGroupIcon style={{ paddingTop: '0.575rem' }} className='white' />
          </span>
        </div>
      </div>
      <h2 className="f4 mv0 flex flex-wrap v-mid">{team.name}</h2>
    </div>
  </div>;


const OSMTeamsAuthButton = ({ logInStyle, signUpStyle, alternativeSignUpText }) => {
  const location = useLocation()
  const [debouncedCreateLoginWindow] = useDebouncedCallback(
    (redirectTo) => createOSMTeamsLoginWindow(redirectTo),
    3000,
    { leading: true },
  );

  return (
    <Button onClick={() => debouncedCreateLoginWindow(location.pathname)} className={`${logInStyle}`}>
      <FormattedMessage {...messages.connectOSMTeams} />
    </Button>
  );
};