class HttpLibrary {
    async makeRequest(method, url, data = null) {
        let config = {
            method: method,
            headers: {}
        };

        if (data) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(data);
        }

        let response = await fetch(url, config);

        if (!response.ok) {
            throw new Error('HTTP error! Status: ' + response.status);
        }

        let result;
        try {
            result = await response.json();
        } catch {
            throw new Error('Failed to parse JSON from response.');
        }
        return result;
    }


    async get(url, params = {}) {
        let query = new URLSearchParams(params).toString();
        return this.makeRequest('GET', `${url}?${query}`);
    }

    async post(url, data) {
        return this.makeRequest('POST', url, data);
    }

    async put(url, data) {
        return this.makeRequest('PUT', url, data);
    }

    async delete(url) {
        return this.makeRequest('DELETE', url);
    }

    async patch(url, data) {
        return this.makeRequest('PATCH', url, data);
    }
}

function getQueryParameters() {
    const keys = document.querySelectorAll('.queryKey');
    const values = document.querySelectorAll('.queryValue');
    let params = {};
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].value) {
            params[keys[i].value] = values[i].value;
        }
    }
    return params;
}

function addQueryParamInput() {
    const queryParamsSection = document.getElementById('queryParamsSection');
    const newPair = document.createElement('div');
    newPair.innerHTML = `
        <input type="text" placeholder="Key" class="queryKey">
        <input type="text" placeholder="Value" class="queryValue">
    `;
    queryParamsSection.insertBefore(newPair, queryParamsSection.lastChild);
}


