/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification.js').getGitHubProfileAsync;
var getStatusCodeAsync = require('./promiseConstructor').getStatusCodeAsync;
// var fs = require('fs');
// Promise.promisifyAll(fs);




var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // read github username from first line of readFilePath
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((username) =>{
      return getGitHubProfileAsync(username);
    })
    .then((body) => {
      body = JSON.stringify(body);
      return fs.writeFileAsync(writeFilePath, body, (err) => {
        if (err) {
          return err;
        }
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
