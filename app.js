document.addEventListener('DOMContentLoaded', () => {
    const httpLibrary = new HttpLibrary();

    // UI-related functions
    function adjustUIBasedOnMethod() {
        const methodRadios = document.querySelectorAll('input[name="httpMethod"]');
        let method;
        methodRadios.forEach(radio => {
            if (radio.checked) {
                method = radio.value;
            }
        });

        const dataSection = document.getElementById('dataSection');
        if (['GET', 'DELETE'].includes(method)) {
            dataSection.style.display = 'none';
        } else {
            dataSection.style.display = 'block';
        }
    }

    function displayResponse(responses) {
        let formattedResponse = '';
        if (Array.isArray(responses)) {
            responses.forEach(response => {
                formattedResponse += `
                    Title: ${response.title}\n
                    Body: ${response.body}\n
                    ----------------------\n
                `;
            });
        } else {
            formattedResponse = `
                Title: ${responses.title}\n
                Body: ${responses.body}\n
            `;
        }
        document.getElementById('response').textContent = formattedResponse;
    }

    // Event Handlers
    async function sendRequest() {
        const responseElement = document.getElementById('response');
        const methodRadios = document.querySelectorAll('input[name="httpMethod"]');
        let method;
        methodRadios.forEach(radio => {
            if (radio.checked) {
                method = radio.value;
            }
        });
        const url = document.getElementById('url').value;
        let data = document.getElementById('requestData').value;
        if (data) {
            data = JSON.parse(data);
        }

        document.getElementById('loading').style.display = 'inline';
        try {
            let response;
            switch (method) {
                case 'GET':
                    const queryParams = getQueryParameters();
                    response = await httpLibrary.get(url, queryParams);
                    break;
                case 'POST':
                    response = await httpLibrary.post(url, data);
                    break;
                case 'PUT':
                    response = await httpLibrary.put(url, data);
                    break;
                case 'DELETE':
                    response = await httpLibrary.delete(url);
                    break;
                case 'PATCH':
                    response = await httpLibrary.patch(url, data);
                    break;
            }
            responseElement.style.color = 'black';  // Reset color to default on success
            displayResponse(response);
        } catch (error) {
            responseElement.textContent = 'Error: ' + error.message;
            responseElement.style.color = 'red';  // Set the text color to red
        } finally {
            document.getElementById('loading').style.display = 'none';
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

    // Initial setup
    adjustUIBasedOnMethod();

    // Bind sendRequest function to Send button
    document.getElementById('sendButton').addEventListener('click', sendRequest);
});
