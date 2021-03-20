const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

const fetchToken = (endpoint, data, method = 'GET') => {
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-api-key': token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-api-key': token
            },
            body: JSON.stringify(data),
        });
    }
}

export {
    fetchSinToken,
    fetchToken
}