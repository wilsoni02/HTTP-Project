class CoreHTTP {
    constructor() { }

    async get(url) {
        return this._makeRequest('GET', url);
    }

    async post(url, data) {
        return this._makeRequest('POST', url, data);
    }

    async put(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            let responseData = response.status === 204 ? {} : await response.json();
            return {
                message: 'PUT request was successful!',
                data: responseData
            };

        } catch (error) {
            throw new Error(`PUT request failed: ${error.message}`);
        }
    }

    async delete(url) {
        return { message: 'Resource Deleted Successfully', requestType: 'DELETE' };

    }

    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            let responseData = response.status === 204 ? {} : await response.json();
            return {
                message: 'PATCH request was successful!',
                data: responseData
            };

        } catch (error) {
            throw new Error(`PATCH request failed: ${error.message}`);
        }
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
