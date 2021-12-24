
// Uses Node.js
// when running "node app.js <text>"" the process argv will capture the user
// in put that is put in the above text field. It then will return
// an array containing the file location of node, the file location of the
// current directory, and then all the other items in the array will be
// the words that the user typed in <text>.
// we slice the array to get rid of the first 2 paths because they are 
// not useful here.
const profileDataArgs = process.argv.slice(2, process.argv.length);

// The file system is considered a module in Node.js's core library 
// that gives yopu the capability of interacting with your computers file 
// system. A module can be a function, a class, an object, or simple variables. 
// Whatever its form, a module is a reusable piece of code that can be imported 
// to anywhere it's needed. 
const fs = require("fs");

//  because we added the module.exports statement at the end of the 
// page-template.js file (with module.exports set to our generatePage() 
// function), we can now use the require statement to include generatePage() 
// at the top of the app.js file.
const generatePage = require('./src/page-template.js');

// assignment destructuring, is the same as these two
// lines of code
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];
// assigns elements of an array to variable names in a single expression
const [name, github] = profileDataArgs;



// According to the documentation and the examples, this function can 
// create multiple file types, including TXT, PDF, HTML, JSON, and more. 
// The fs.writeFile() function definition has three arguments. The first 
// argument is the name of the file that's being created. The next argument 
// is the data that will write onto the file, in this case the HTML template 
// literal. The last parameter is a callback function that will be used 
// for error as well as the success message.
// In the callback function block, a conditional statement checks for 
// the err being returned by the callback function. If err exists, an 
// error message is displayed.
fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;
  
    console.log('Portfolio complete! Check out index.html to see the output!');
  });