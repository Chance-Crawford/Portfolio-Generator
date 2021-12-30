const fs = require('fs');

// creating a promise to make code more readable
// in app.js
// see google docs promises - javascript
const writeFile = fileContent => {

    // We're actually just using the same fs.writeFile() function that 
    // we have in app.js. This time, however, we're contextualizing it to a 
    // Promise and accepting the HTML file's content as a parameter.
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and send the 
            // error to the Promise's `.catch()` method
            if (err) {
              reject(err);
              // return out of the function here to make sure the Promise 
              // doesn't accidentally execute the resolve() function as well
              return;
            }
      
            // if everything went well, resolve the Promise and send the 
            // successful data to the `.then()` method
            resolve({
              ok: true,
              message: 'File created!'
            });
        });
    });
};


const copyFile = () =>{
    return new Promise((resolve, reject) =>{
        fs.copyFile("./src/style.css", "./dist/style.css", err=>{
            if(err){
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: "Style sheet copied successfully!"
            });
        });
    });
}


// export the functions as module
// We're actually exporting an object with the two functions, writeFile() 
// and copyFile(), used as methods, writeFile and copyFile.

// you can also use shorthand property names and say
// module.exports = { writeFile, copyFile };
// due to ES6
module.exports = {
    writeFile: writeFile,
    copyFile: copyFile
  };