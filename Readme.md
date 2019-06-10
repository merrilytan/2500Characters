# 2500Characters

[![Build Status](https://travis-ci.com/merrilytan/2500Characters.svg?token=zqPispBPepwLZoyueNtn&branch=master)](https://travis-ci.com/merrilytan/2500Characters)

2500Characters is a web application that teaches Mandarin speakers to read 2500 of the most common Chinese characters using the [Leitner system](https://en.wikipedia.org/wiki/Leitner_system) learning method. 

## Project Status

This project is deployed to production which can be seen [here](http://ec2-18-216-160-159.us-east-2.compute.amazonaws.com).

More features are currently in development including (1) a page summary of Characters that have been mastered, (2) animations for a livelier user experience.

## Languages & Tools

###Frontend
* JavaScript ES6
* SCSS
* HTML
* Webpack - module bundler
* Babel - transpiler

###Backend
* NodeJS - backend server
* Express - web API framework 
* [PassportJS](http://www.passportjs.org/) - authentication library
* MongoDB - database
* [Mongoose](https://mongoosejs.com/) - data validation using schemas

## Getting Started

Install Dependencies:

```
cd frontend
npm install
```

```
cd backend
npm install
```

To Build Frontend:

```
cd frontend
npm run build
```

To Start server:

```
cd backend
npm run start
```

To Visit App: 

localhost:27017






