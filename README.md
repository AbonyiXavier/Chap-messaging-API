# Chat-Messaging-API

[![Build Status](https://app.travis-ci.com/AbonyiXavier/Chat-Messaging-API.svg?branch=main)](https://app.travis-ci.com/AbonyiXavier/Chat-Messaging-API)

A chat web API. It is built on top of NodeJS and Express. It is higly flexible because it provides the following features with opportunity to:

<<<<====>>>>
- Sign up
- Sign in
- fetch users
- fetch user by Id 
- update user profile
- Soft delete users


<<<<===>>>>
- create channels
- search for channels
- select channel to join
- View members in channel
- Soft delete channel

<<<<===>>>>
- Post message in channel
- Fetch messages or conversation in channel 
- mark message as read 
- Soft delete message



# Getting Started

click link to view the schema mapping of the chat messaging app [url](https://drive.google.com/file/d/1v8SJ_Krj7V_MAto-sq1D5pV9ua75gfY_/view?usp=sharing)

To obtain a copy of this app download or clone the repository at this [url](https://github.com/AbonyiXavier/Chat-Messaging-API)

Postman collection documentation link [url](https://documenter.getpostman.com/view/7775892/UUy65PgR)

Heroku link [url](https://chat-messaging-api.herokuapp.com)

# Prerequisites

You must have

- NodeJs Installed
- A browser Installed
- A REST API client(like POSTMAN) Installed
- An Internet connection to download the dependencies.

## Installing locally

- (If the repository wasn't cloned)Extract the contents of the downloaded zip file into any suitable location on the computer
- In the command prompt, cd to the root of the directory you extracted the app into
- Run 'npm install' to install all dependencies
- Run 'npm run dev' to start the application
- Run 'npm run test' to run test on the application
- Run 'npm run seed' to run seed table and dummy data on the database
- In a browser address bar navigate to ''

# Using Chat Messaging App through a restful client

- Open any restful client application initially installed
- Select the appropriate http method. Either GET, POST, PUT, PATCH

## Built With

- NodeJs
- Express
- Mongodb(database)
- Mongoose (ODM)
- AWS s3 bucket
- Mocha and Chai
- Travis CI
- Deployed on Heroku


## Author

- AbonyiXavier
