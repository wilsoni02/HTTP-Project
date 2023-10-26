class CoreHTTP {
    constructor() { }

    async get(url) {
        return this._makeRequest('GET', url);
    }

    async post(url, data) {
        return this._makeRequest('POST', url, data);
    }

    async put(url, data) {
        return this._makeRequest('PUT', url, data);
    }

    async delete(url) {
        return this._makeRequest('DELETE', url);
    }

    async patch(url, data) {
        return this._makeRequest('PATCH', url, data);
    }

    async _makeRequest(method, url, data = null) {
        const options = {
            method: method,
            headers: { 'Content-type': 'application/json' }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const responseData = await response.json();
            return {
                message: `${method} request was successful!`,
                data: responseData
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
