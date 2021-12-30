
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

// replaced with the writefile and copyfile we made in generate-site.js
// which returns a promise and handles all the writing and copying
// the 2 functions in the module object were destructured to variables
// so we can use them like writeFile() and dont need dot notation.
const { writeFile, copyFile } = require('./utils/generate-site.js');

//  because we added the module.exports statement at the end of the 
// page-template.js file (with module.exports set to our 
// function from the file), we can now use the require statement to include 
// generatePage() in this app.js file.
// This expression assigns the anonymous HTML template function 
// in page-template.js to the variable generatePage.
const generatePage = require('./src/page-template.js');


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
        message: 'What is your name?',
        // property that accepts a boolean to check
        // that the users answer was valid.
        // here we are using the users input to make sure that they 
        // entered somnething and didnt leave the field blank.
        // if the condition evaluates to false, the user receives a message 
        // and is prompted with the same question until an answer is received.
        validate: nameInput =>{
          if(nameInput){
            return true;
          }
          else{
            console.log("Please enter your name!");
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        validate: gitInput =>{
          if(gitInput){
            return true;
          }
          else{
            console.log("Please enter your GitHub username!");
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        // Next we'll add another property to the prompt looking for 
        // information about the user called when. This is like the validate 
        // method we used previously, but instead of passing the value entered 
        // for that specific question in as the parameter, it passes an object 
        // of all of the answers given so far as an object.
        // the when property returns an object that lists the current answers
        // as properties, here we are accessing the confirmAbout property
        // in that object and seeing if it is true.
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      
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
  console.log("DATAAAAA " + portfolioData);
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
      message: 'What is the name of your project?',
      validate: nameInput =>{
        if(nameInput){
          return true;
        }
        else{
          console.log("Please enter your project name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project.',
      validate: descInput =>{
        if(descInput){
          return true;
        }
        else{
          console.log("Please enter your project description!");
          return false;
        }
      }
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
      message: 'Enter the GitHub link to your project.',
      validate: linkInput =>{
        if(linkInput){
          return true;
        }
        else{
          console.log("Please enter your project's link!");
          return false;
        }
      }
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
// this first line gets the answers from user regarding their name
// and things like that.
promptUser()
// Using Promises, we can chain the functions together using 
// the then() method, as shown here:
// The preceding image shows that by chaining the function 
// call to the then() method, we can control the sequence of the 
// application's control flow. We only want to prompt users with the 
// project questions after the profile questions since they are naturally
// asynch.
// this function prompts the user about any projects they would like to add
// and then catches the answers which are then used in the second "then"
// below this one
// The promptProject() function captures the returning data from promptUser() above.
.then(promptProject)
// after prompting the project, take the data
// from user and generate the page.
// the final set of data from promptUser and promptProject
// are passed here. 
// The finished portfolio data object is returned as 
// portfolioData and sent into the generatePage() function, which will 
// return the finished HTML template code into pageHTML below.
.then(portfolioData => {
  return generatePage(portfolioData);
})
// We pass pageHTML into the newly created writeFile() function, which returns 
// a Promise. This is why we use return here, so the Promise is returned into the 
// next .then() method.
.then(pageHTML => {
  // our own custom function writeFile that returns a promise.
  // write file is from utils/generate-site.js.
  // writes the data returned by generate page to
  // a new generated html page
  return writeFile(pageHTML);
})
// Upon a successful file creation, we take the writeFileResponse object 
// provided by the writeFile() function's resolve() execution to log it, and 
// then we return copyFile().
.then(writeFileResponse => {
  console.log(writeFileResponse);
  return copyFile();
})
// The Promise returned by copyFile() then lets us know if the CSS file 
// was copied correctly, and if so, we're all done!
.then(copyFileResponse => {
  console.log(copyFileResponse);
})
// this is a promise chain, all promises based functions return and then pass the data
// to the next function. This forces them to go one at a time.
// We only need to write one .catch() method to handle any error that may occur 
// with any of the Promise-based functions If we need to execute a Promise's 
// reject() function, it'll just jump right to the .catch() method.
.catch(err => {
  console.log(err);
});


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