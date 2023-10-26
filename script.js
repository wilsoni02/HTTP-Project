// Created By: Ian Wilson
// October 25th, 2023

// Instantiate the CoreHTTP class
const http = new CoreHTTP();

// Asynchronously sends an HTTP request based on the type specified
    async function sendRequest(reqType, targetURL, data = null) {
        let responseData, output = "";
        try {
            // Construct data outside the switch since POST, PUT, and PATCH use similar data
            if (['post', 'put', 'patch'].includes(reqType)) {
                data = {
                    title: document.querySelector("#postTitle").value,
                    body: document.querySelector("#postBody").value,
                };
            }

            switch (reqType) {
                case 'get':
                    responseData = await http.get(targetURL);
                    break;
                case 'post':
                    responseData = await http.post(targetURL, data);
                    break;
                case 'put':
                    responseData = await http.put(targetURL, data);
                    break;
                case 'delete':
                    responseData = await http.delete(targetURL);
                    break;
                case 'patch':
                    responseData = await http.patch(targetURL, data);
                    break;
        }
        // Display message if it exists
        if (responseData.message) {
            output += `<p>${responseData.message}</p>`;
        }

        if (responseData.data && Array.isArray(responseData.data)) {
            output += "<ul style=\"list-style:none\">";
            responseData.data.forEach((post) => {
                output += `<li><strong>${post.title}</strong> - ${post.body}</li>`;
            });
            output += "</ul>";
        } else if (responseData.data) {
            const title = responseData.data.title || "No Title";
            const body = responseData.data.body || "No Content";
            output += `<p><strong>${title}</strong> - ${body}</p>`;
        }

        document.querySelector("#response").innerHTML = output;

    } catch (error) {
        // Handle and display errors
        document.querySelector("#response").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Event listener for the "SEND" button
document.querySelector("#SendReq").addEventListener("click", async (e) => {
    e.preventDefault();

    // Fetch input values from the form
    let baseRoute = document.querySelector("#route").value;
    const idParam = document.querySelector("#idParam").value;
    const idQuery = document.querySelector("#idQuery").value;

    if (idParam) {
        baseRoute += `/${idParam}`;
    }

    const queryParams = [];
    if (idQuery) {
        queryParams.push(`id=${idQuery}`);
    }

    if (queryParams.length > 0) {
        baseRoute += `?${queryParams.join("&")}`;
    }

    const radioButtons = document.querySelectorAll('input[name="HTTPtype"]');
    let reqType;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            reqType = radioButton.value;
            break;
        }
    }

// Send the request
    await sendRequest(reqType, baseRoute);
});
