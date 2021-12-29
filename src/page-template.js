
// function directly(implicitly) returns a string
// that we can later pasrse to html thatt will contain
// information that the user entered into the terminal.
// with template literals to add variables into the string
// const generatePage = (name, github) => {
//     return `
//     <!DOCTYPE html> 
//     <html lang="en"> 
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="ie=edge">
//         <title>Portfolio Demo</title>
//     </head>

//     <body>
//         <h1>${name}</h1>
//         <h2><a href="https://github.com/${github}">Github</a></h2>
//     </body>
//     </html>
//     `;
// }


// create the about section  if user says they want an about section.
// This function, generateAbout(), will accept the about variable as a 
// parameter to see if user entered any text for about section, 
// and if it doesn't exist, we'll simply return an empty string. 
// If it does exist, however, we'll return the entire <section> element.
const generateAbout = aboutText => {
    if (!aboutText) {
      return '';
    }
  
    return `
      <section class="my-3" id="about">
        <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
        <p>${aboutText}</p>
      </section>
    `;
};


const generateProjects = projectsArr => {
    
    
    // get new array of just featured projects
    // from the list of all the projects with filter.
    // checks if feature property of current object in array
    // is true. if true, put current object into new array featuredProjects.
    const featuredProjects = projectsArr.filter(project => {
        if (project.feature) {
        return true;
        } else {
        return false;
        }
    });

    // get new array of all non-featured projects
    const nonFeaturedProjects = projectsArr.filter(project => {
        if (!project.feature) {
        return true;
        } else {
        return false;
        }
    });


    // takes the array of projects from inquirer that are featured and iterates 
    // through each individual project object. It gets the project's
    // name etc and destructures the properties into variables to put in the 
    // template literal for the project.
    // we then reassign this new array of project template literals to projectHtmlArr
    // The array .filter() method is another new JavaScript array method that allows us 
    // to execute a function on each element of the array to test whether or not it 
    // should be in the new array created from it.
    const featuredProjectHtmlArr = featuredProjects.map(({ name, description, languages, link }) => {
        return `
        <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
            Built With:
            ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
        </div>
        `;
    });

    // same as above but for the unfeatured,
    // changing it slightly so projects will only take up half of the page
    const nonFeaturedProjectHtmlArr = nonFeaturedProjects.map(
        ({ name, description, languages, link }) => {
        return `
            <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
                Built With:
                ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
            </div>
        `;
        }
    );

    // the array of template literals generated from the 
    // project info above is now put into this 
    // template literal (section that holds all the projects), 
    // where it is joined to create a big string. that is 
    // then all able to be read as HTML.
    return `
        <section class="my-3" id="portfolio">
        <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
        <div class="flex-row justify-space-between">
        ${featuredProjectHtmlArr.join('')}
        ${nonFeaturedProjectHtmlArr.join('')}
        </div>
        </section>
    `;
  
    
    
};


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
// this line is no longer used in current website
// module.exports = generatePage;

// this function takes the portfolio object that is given to us by inquirer
// module from app.js
// we are exporting this function as a module to use in app.js
// that will take the portfolio promise object and get it's values using
// dot notation
module.exports = templateData => {
    console.log(templateData);
  
    // destructure "projects" and "about" data from templateData 
    // based on their property key names
    // With array destructuring, the values are destructured in the order of 
    // the array, meaning that we can call the variable storing the destructured 
    // array data whatever we want, as long as it goes in order. 
    // With object destructuring, however, we can grab any value we want out 
    // of the object by simply calling on the key name of the property we want to 
    // create a variable for.

    // So now when we destructure the data from templateData, we create the projects 
    // and about variables the same way we did before, but we're taking the rest of the 
    // data that hasn't been destructured from templateData and storing it in a new object, 
    // called header. This is the "rest operator"
    // see google docs spread and rest operators for more information
    const { projects, about, ...header } = templateData;

    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio Demo</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <header>
        <div class="container flex-row justify-space-between align-center py-3">
            <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
            <nav class="flex-row">
            <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${
                header.github
            }">GitHub</a>
            </nav>
        </div>
        </header>
        <main class="container my-5">
            ${generateAbout(about)}
            ${generateProjects(projects)}
        </main>
        <footer class="container text-center py-3">
        <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
        </footer>
    </body>
    </html>
    `;

  };