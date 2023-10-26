// Created By: Ian Wilson
// October 25th, 2023

// Creating the Class
class CoreHTTP {
    // Constructor initializes the CoreHTTP instance
    constructor() { }

    // Setting up the methods

    // Sends a GET request to the specified URL
    async get(url) {
        return this._makeRequest('GET', url);
    }

    // Sends a POST request to the specified URL with the provided data
    async post(url, data) {
        return this._makeRequest('POST', url, data);
    }

    //Sends a PUT request to the specified URL with the provided data
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
    // Sends a Delete request
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const responseData = await response.json();
            return {
                message: `DELETE request was successful!`,
                data: null
            };
        } catch (error) {
            throw error;
        }
    }

    // Sends a patch request
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

    //Makes an asynchronous HTTP request using the fetch API
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
            throw error;
        }
    }
}
