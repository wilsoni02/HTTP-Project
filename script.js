// Created By: Ian Wilson
// October 25th, 2023

// Instantiate the CoreHTTP class
const http = new CoreHTTP();

// Asynchronously sends an HTTP request based on the type specified
async function sendRequest(reqType, targetURL) {
    let responseData, output = "";

    try {
        // Switch between different request types and call the appropriate method
        switch (reqType) {
            case 'get':
                responseData = await http.get(targetURL);
                break;
            case 'post':
                const postData = {
                    title: document.querySelector("#postTitle").value,
                    body: document.querySelector("#postBody").value,
                };
                responseData = await http.post(targetURL, postData);
                break;
            case 'put':
                const putData = {
                    title: document.querySelector("#postTitle").value,
                    body: document.querySelector("#postBody").value,
                };
                responseData = await http.put(targetURL, putData);
                console.log('PUT responseData:', responseData);
                break;
            case 'delete':
                responseData = await http.delete(targetURL);
                break;

            case 'patch':
                const patchData = {
                    title: document.querySelector("#postTitle").value,
                    body: document.querySelector("#postBody").value,
                };
                responseData = await http.patch(targetURL, patchData);
                console.log('PATCH responseData:', responseData);
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
            output += `<p><strong>${responseData.data.title}</strong> - ${responseData.data.body}</p>`;
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
    const postTitle = document.querySelector("#postTitle").value;
    const postBody = document.querySelector("#postBody").value;

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
// Construct the data payload for POST, PUT, and PATCH requests
    const data = {
        title: postTitle,
        body: postBody,
        userId: 1
    };
// Send the request
    await sendRequest(reqType, baseRoute, data);
});
