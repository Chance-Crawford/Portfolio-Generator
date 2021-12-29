
// Uses Node.js, for more info see google docs, node.js - notes.

// when running "node app.js <text>"" the process argv will capture the user
// in put that is put in the above text field. It then will return
// an array containing the file location of node, the file location of the
// current directory, and then all the other items in the array will be
// the words that the user typed in <text>.
// we slice the array to get rid of the first 2 paths because they are 
// not useful here.
// we ended up not using the command below but all the info is still correct
// const profileDataArgs = process.argv.slice(2, process.argv.length);

// see google docs node.js - notes, downloading npm module
// inquirer is a npm package that allows us to use node 
// to prompt the user for information
const inquirer = require('inquirer');

// The file system is considered a module in Node.js's core library 
// that gives yopu the capability of interacting with your computers file 
// system. A module can be a function, a class, an object, or simple variables. 
// Whatever its form, a module is a reusable piece of code that can be imported 
// to anywhere it's needed. 
// const fs = require("fs");

//  because we added the module.exports statement at the end of the 
// page-template.js file (with module.exports set to our generatePage() 
// function), we can now use the require statement to include generatePage() 
// at the top of the app.js file.
// const generatePage = require('./src/page-template.js');


const promptUser = () =>{
    // from inquirer documentation on how to show a prompt
    // THEN catch the answer from the user.
    // which we do below.
    // in this function we are returning a promise which we then
    // use the promise later to retrieve the answer from the user.
    // Notice that inquirer's prompt method can receive 
    // an array of objects in its argument, known as the question object. 
    // The properties of the question object identify the type, name, and question 
    // message of this particular question. 
    // name being a unique way to identify the specific question.
    // when an answer is returned by user, the name property will be used as a key
    // to store the value of the answer. for example, if user entered bill
    // an answer would return as an object { name: "bill" }.
    // "Input" was chosen as the type of 
    // question because the answer will be a text reply.
    return inquirer.prompt([
      // multiple questions for prompt from
      // objects, each will prompt the question and
      // capture the response
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username'
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
    ]);
    
};


// for when they are adding a project to portfolio

const promptProject = portfolioData => {

  // parameter is now an object that will keep track
  // of all of the users projects as they keep adding more
  // this could be problematic if the projects array is set to an 
  // empty array in every function call, because this would essentially 
  // erase all the project data we collected. We want this expression to 
  // occur on the first pass only.
  // so we check to make sure it doesnt already exist
  if(!portfolioData.projects){
    portfolioData.projects = [];
  }
  

  console.log(`
=================
Add a New Project
=================
`);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)'
    },
    // The checkbox type was used to give the user options a 
    // list of answers to choose that allows none or all selections as valid entries.

    // The checkbox type also has the choices property, which contains 
    // the list of possible answers in an array.
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)'
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData =>{
    portfolioData.projects.push(projectData);
    // if the property to add another property was marked true
    // by the user. then run the function again and pass the array
    // into it to keep track of all the projects being added
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};



// The answer object is returned as a Promise in the function. 
// We'll explore Promises more 
// later, but for now understand that this is a new tool for dealing with 
// asynchronous functions that will return the answer object in the "then" function. 
promptUser().then(answers => console.log(answers))
// Using Promises, we can chain the functions together using 
// the then() method, as shown here:
// The preceding image shows that by chaining the function 
// call to the then() method, we can control the sequence of the 
// application's control flow. We only want to prompt users with the 
// project questions after the profile questions since they are naturally
// asynch.
.then(() =>{return promptProject([]);}).then(portfolioProjects => console.log(portfolioProjects));


// assignment destructuring, is the same as these two
// lines of code
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];
// assigns elements of an array to variable names in a single expression
// ex. const [name, github] = profileDataArgs;



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
// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });