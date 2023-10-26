const http = new CoreHTTP();

async function sendRequest(reqType, targetURL, data = null) {
    try {
        const responseData = await http[reqType](targetURL, data);

        let output = "";

        if (responseData.message) {
            output = `<p>${responseData.message}</p>`;
        }

        if (Array.isArray(responseData.data)) {
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
        document.querySelector("#response").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

document.querySelector("#SendReq").addEventListener("click", async (e) => {
    e.preventDefault();

    let baseRoute = document.querySelector("#route").value;
    const idParam = document.querySelector("#idParam").value;
    const nameQuery = document.querySelector("#nameQuery").value;
    const idQuery = document.querySelector("#idQuery").value;
    const postTitle = document.querySelector("#postTitle").value;
    const postBody = document.querySelector("#postBody").value;

    if (idParam) {
        baseRoute += `/${idParam}`;
    }

    const queryParams = [];
    if (nameQuery) {
        queryParams.push(`name=${nameQuery}`);
    }
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

    const data = {
        title: postTitle,
        body: postBody,
        userId: 1  // This is just a placeholder as the API typically requires a userId for creating posts
    };

    await sendRequest(reqType, baseRoute, data);
});
