import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { OSM_TEAMS_API_URL } from '../config';
import { fetchExternalJSONAPI } from '../network/genericJSONRequest';

const useFetchExternal = (url, trigger = true, token) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      if (trigger) {
        setLoading(true);
        try {
          // replace in locale is needed because the backend uses underscore instead of dash
          const response = await fetchExternalJSONAPI(
            url,
            token,
            'GET',
          );
          setData(response);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      }
    })();
  }, [url, token, trigger]);
  return [error, loading, data];
};

export const useOSMTeams = (osmteams_token) => {
  const myTeamsURL = new URL('/api/my/teams', OSM_TEAMS_API_URL)
  return useFetchExternal(myTeamsURL.href, true, osmteams_token);
}