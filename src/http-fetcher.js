export default function httpFetcher(url, options = {}) {
  return function fetcher(graphQLParams) {
    return fetch(url, {
      body: JSON.stringify(graphQLParams),
      method: 'POST',
      mode: 'cors',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers
      }
    }).then((response) => {
      const contentType = response.headers.get('content-type');

      if (contentType.includes('application/json')) {
        return _handleJSONResponse(response);
      }

      return _handleTextResponse(response);
    });
  };
}

function _handleJSONResponse(response) {
  return response.json().then((responseJSON) => {
    const hasError = Boolean(responseJSON.errors);

    if (hasError) {
      return {
        status: response.status,
        errors: responseJSON.errors,
        hasError: true
      };
    }

    return responseJSON;
  });
}

function _handleTextResponse(response) {
  return response.text().then((responseText) => {
    const hasError = !response.ok;

    if (hasError) {
      return {
        status: response.status,
        errors: responseText,
        hasError: true
      };
    }

    return {data: responseText};
  });
}
