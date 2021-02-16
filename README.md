# lab-06

**Author**: Lillian McBride
**Version**: 1.0.0 

## Overview
This is a custom built backend server using JavaScript running in node.js.  It responds to queries for locations and weather patterns in that area. 

## Getting Started
first a server.js file is made and then npm init creates the package.json. Next the user types 'npm install dotenv express cors' to get the other dependancy modules needed.
A data folder is created and the supplied locations.json and weather.json go in there. 
A .env file is made with the line 'PORT=3000' so the server knows what port to listen on.  
The server.js file must have functions written into it that uses the express, and cors modules that were installed via npm.
Once the server is functional and able to listen on it's port for requests and respond appropriately it can be tested via localhost by running 'nodemon .' from the linux command line.
The working app is then deployed to heroku which will host the backend server that was created. A front end is developed elsewhere and the two work in tandem.

## Architecture
Primarily the language is JavaScript, and relies on node.js. 
The module Express handles preexisting functions of a server so our server.js can be specific to the queries and data the app serves.
It is deployed on Heroku, and also has a GitHub repository.

## Changelog
02-15-2021 6:18 - Basic scaffolding of the app is made, all files are in their proper places, and we're ready to begin writing the server.js file.

## Credits and Collaborations
Some thanks to Daniel Rogahn for help troubleshooting at various points in the process.