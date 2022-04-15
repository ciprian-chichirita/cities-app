//from https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
/**
 *
 * @param endpoint:string, resource name
 * @param configuration:RequestInit, fetc configuration
 * @returns promise
 */
export const client = (endpoint : string, { body, ...customConfig }: RequestInit = {}) => {
  const headers = { 'content-type': 'application/json' };

  const config:RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
  return window
    .fetch(url, config)
    .then(async response => {
      if (response.ok) {
        //we can change this and make it more generic
        if(endpoint.indexOf('.csv') !== -1) {
          return await response.text();
        }

        return await response.json();
      } else {
        const errorMessage = await response.text();
        return Promise.reject(new Error(errorMessage));
      }
    })
};
export default client;