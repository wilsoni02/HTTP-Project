# CoreHTTP - HTTP Request Testing App

This project is a simple HTTP client that lets you test different HTTP request methods (GET, POST, PUT, DELETE, PATCH) against an API endpoint. It includes a user-friendly interface for entering the URL and request details, then displays the response.

## Project Files

- **index.html**  
  The main HTML file that contains the structure and form elements for user input.

- **style.css**  
  The stylesheet that provides the visual styling and layout for the app.

- **coreHTTP.js**  
  A JavaScript class that wraps the Fetch API to handle HTTP requests for different methods (GET, POST, PUT, DELETE, PATCH).

- **script.js**  
  Contains the logic to capture user input, trigger the appropriate HTTP request using the CoreHTTP class, and display the response.

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.).
- (Optional) A local web server.  
  Although you can simply open `index.html` in your browser, using a local server is recommended (to avoid CORS issues with the Fetch API). You can use:
    - The Live Server extension in VS Code.
    - Node's `http-server` package.
    - Or any other static server solution.

## How to Set Up

1. **Download or Clone the Repository**  
   Ensure you have all the project files in a single directory.

2. **(Optional) Install a Local Web Server**  
   If you want to run the app on a local server using Node.js:
    - Install Node.js from [nodejs.org](https://nodejs.org/) if you haven’t already.
    - In your terminal, install `http-server` globally:
      ```bash
      npm install -g http-server
      ```
    - In the project directory, run:
      ```bash
      http-server
      ```
    - Open your browser and navigate to the provided localhost URL (usually `http://127.0.0.1:8080`).

3. **Directly Open index.html**  
   Alternatively, you can double-click `index.html` to open it directly in your browser. (Note: This method may sometimes lead to issues with CORS depending on your browser settings.)

## How to Use the App

1. **Enter API Details:**
    - The form on the page includes an input for the API route. By default, it is set to `https://jsonplaceholder.typicode.com/posts`.
    - Optionally, you can specify an ID for a specific post in the "ID Parameter" field or filter posts using "ID Query".

2. **Set Request Data (for POST, PUT, or PATCH):**
    - Fill in the **Post/Update/Patch Title** and **Post/Update/Patch Body** fields with the data you want to send.

3. **Select the HTTP Request Method:**
    - Choose between GET, POST, PUT, DELETE, or PATCH by selecting the corresponding radio button.

4. **Send the Request:**
    - Click the **SEND** button to submit the request.
    - The response will be displayed in the "Response" section below the form. If the response data is an array, it will be listed as a set of items; if it’s a single object, it will be shown with the title and body.

## Example

- **GET Request:**  
  Simply leave the title and body fields empty, select GET, and click SEND to retrieve posts from the API.

- **POST Request:**  
  Enter a title and body, select POST, and click SEND to add a new post. The app will display the server response indicating the result.

## Customization

Feel free to modify the HTML, CSS, and JavaScript files to better suit your needs. For example, you can adjust the styling in `style.css`, or extend the functionality in `coreHTTP.js` and `script.js`.

---

This README should help you or anyone who comes across the project understand its purpose, how to set it up, and how to use it for testing HTTP requests.
