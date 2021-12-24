
// function directly(implicitly) returns a string
// that we can later pasrse to html thatt will contain
// information that the user entered into the terminal.
// with template literals to add variables into the string
const generatePage = (name, github) => {
    return `
    <!DOCTYPE html> 
    <html lang="en"> 
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio Demo</title>
    </head>

    <body>
        <h1>${name}</h1>
        <h2><a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
}


// In order to use functions from one module inside another, we 
// use the related statements module.exports and require. In the source 
// file that has the functions we want to make available to other files, 
// we use module.exports at its bottom. In the destination file(s) that we 
// want to receive those exported functions, we put require at the top.

// In this example we set the entire module export equal to one function,
// if we wanted to add more functions to the export,k we would need to create 
// an object.
// module.exports = {generatePage: generatePage, otherPage: otherPage}.
// Then within the file we are importing the module, we would need to use the 
// variable with dot notation to retrieve the function we want.
// const page = require("./src/page-template.js");
// page.generatePage();
module.exports = generatePage;