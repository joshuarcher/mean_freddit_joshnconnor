# Notes on Node development

#### package.json
Contains name, version, description, etc
* dependencies: run to insert in dependencies
```
$ npm install package --save
```
* scripts: maps npm command line to a short tag
```
"start": "nodemon app.js -e mustache"
```

#### importing libraries for express
```
var express = require('express');
var app = express()
```
