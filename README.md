# Employers: employers directory for Postlight staff
Peter Bardawil Postlight code challenge

![Build Status](http://63.35.1.138:8080/buildStatus/icon?job=docker-app "Badge")

![Technologies stack](https://employers-postlight.s3-eu-west-1.amazonaws.com/project-tech.jpg)


## 🔧 Used Technologies:
This project is an employers directory application that's built using latest and most stable open source technologies that each serve a specific purpose:

 - NodeJS (using TypeScript with tslint): chosen for its' speed and robustness
 - GraphQL: chosen for its' flexibility and multi-purpose API re-usability aspects
 - MongoDB: chosen for its' speed and non structured nature 
 - ReactJS (with ESLint): chosen for its' robustness, code re-usability and vast Ecosystem  
 - JWT auth: chosen for its' secure nature and adding the ability of working in a stateless manners

## 📝 Features
- [x] Sign up
- [x] Sign in
- [x] Account activation
- [x] Add employee
- [x] Update employee
- [x] List employees
- [x] Remove employee
- [x] Search employees (using multiple search parameter types)
- [x] Upload photos
- [x] Transactional emails

## 🖥 Environment:
All app components are hosted on AWS using carefully chosen services in order to fit all requirements in a reliable, scalable and secure way with a well organized architecture.

Docker is used to make setting and running the application very convenient while separating each service as a standalone container, this reduces services dependencies and margins for errors.
Furthermore, the use of Docker allows any contributor to start working on the project very easily, plus it adds the ability to test the app's compatibility with new versions of tech being used.
One great aspect of the app's usage of Docker is its' ability to automatically push any image running on any container to Docker Hub so it can be used on any other machine.

For Continuous Integration (CI), the app uses Jenkins that's built from scratch using code (not using the Jenkins GUI app). The process involves a well structured pipeline that allows: Installing modules, building, unit testing, pushing to Docker hub, composing the app and removing the containers.

To offer more reliable email delivery, all app emails are configured using SMTP. This allows it to work with any chosen transactional email service. (AWS SES, Mailgun, Mandrill by Mailchimp, Sendgrid...)

### Environment variables
To make the process of editing the app's configuration, settings and providers without changing code, the app is using environment variables:

```sh
PORT=3033
JWT_SECRET="somesecret"
MONGO_DB="mongodb://mongo:27017/employers"
AWS_ACCESS_KEY_ID="policy access key"
AWS_SECRET_ACCESS_KEY="policy access secret"
AWS_REGION="aws region"
AWS_BUCKET_NAME="aws bucket name"
CLIENT_URL="http://localhost:3000"
SMTP_HOST="smtp host"
SMTP_USER="smtp user"
SMTP_PASS="smtp pass"
SMTP_EMAIL="smtp.mail.com"
```

### Docker compose:
The app's Docker compose configuration consists of two main containers:
 - App: Handles the app's logic using NodeJS
 - Mongo: Handles the app's database using MongoDB 

```sh
version: "3"
services:
	app:
		container_name: employers-container
		restart: always
		build: ./
		environment:
			- PORT=3000
			- JWT_SECRET=###########
			- MONGO_DB=mongodb://mongo:27017/employers
			- AWS_ACCESS_KEY_ID=AKIAIdSQMJQQZDFHXYC2LFA
			- AWS_SECRET_ACCESS_KEY=ygZvdssHMFGUvTvmL+iUMAiWq+CMozG3LaIVnGBBN86
			- AWS_REGION=eu-west-1
			- AWS_BUCKET_NAME=employers-postlight
			- CLIENT_URL="http://localhost:3000"
			- SMTP_HOST="smtp host"
			- SMTP_USER="smtp user"
			- SMTP_PASS="smtp pass"
			- SMTP_EMAIL="smtp.mail.com"
		ports:
			- "8090:3000"
	mongo:
		container_name: employers-mongo
		image: mongo
		ports:
			- "27017:27017"
```

### Docker hub integration:
Changes made to the docker image are automatically pushed to Docker Hub:

![Build images on Docker Hub](https://employers-postlight.s3-eu-west-1.amazonaws.com/docker-hub.PNG)

### Jenkins CI
The app uses a predefined pipeline available in the Jenkinsfile:

```sh
node('master') {
	def app;
	def registryCredential='dockerhub';
	def registry="peterbardawil/employers-api"
	stage ('Checkout git'){
		checkout scm
	}
	stage('Build node packages') {
		sh 'npm install'
	}
	stage('Build image'){
		sh "docker build -t employers:app${BUILD_NUMBER} -f Dockerfile ."
	}
	stage('Integrations'){
		sh "docker-compose up -d"
	}
	stage('Push image') {
		docker.withRegistry( '', registryCredential ) {
		sh "docker tag employers_app ${registry}:api-dev${BUILD_NUMBER}"
		sh "docker tag employers_app ${registry}:latest"
		sh "docker push ${registry}:api-dev${BUILD_NUMBER}"
		sh "docker push ${registry}:latest"
		}
	}
	stage('UnitTest') {
		sh 'npm test'
	}
	stage('Remove containers'){
		sh "docker-compose -f docker-compose.yml down -v"
	}
}
```

Jenkins Pipeline:

![Jenkins Pipeline](https://employers-postlight.s3-eu-west-1.amazonaws.com/jenkins-pipeline.PNG)


### AWS Hosting
The app is fully hosted on AWS using the following services:
 - ec2 t2-medium (for the Jenkins setup)
 - s3 bucket to save uploaded images (with s3 bucket policy to only upload on a specific bucket) 
 - s3 bucket to host react app
 - ec2 t2-small to setup app and Mongo containers (using Docker)

ec2:
![ec2](https://employers-postlight.s3-eu-west-1.amazonaws.com/aws-ec2PNG.PNG)
  
  
  s3: ![s3](https://employers-postlight.s3-eu-west-1.amazonaws.com/aws-s3.PNG)

  
## ⚙ More about tech used

### GraphQL API:

<table width="100%" style="width: 100%">
    <tbody>
        <tr valign="top">
            <td width="50%" style="width: 50%">
                <p>Query - User Login</p>
                <pre>
query {
  userLogin(email:"test@test.com",
  password:"testtest") {
    id,
    token
  }
}
                </pre>
            </td>
            <td width="50%" style="width: 50%">
                <p>Response</p>
                <pre>
{
  "data": {
    "userLogin": {
      "id": "5da7447873d0024bc000a523",
      "token": "eyJhbGciOiJI"
    }
  }
}
                </pre>
            </td>
        </tr>
        <tr></tr>
        <tr valign="top">
            <td>
                <p>Mutation - Create user</p>
                <pre>
mutation {
  signup(
    name: "john doe", 
    email:"test@test.com",
    password:"testtest"
  ) {
    id
  }
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
  "data": {
    "signup": {
      "id": "5dbea9572dc7477b347b722e"
    }
  }
}
                </pre>
            </td>
        </tr>
        <tr></tr>
        <tr valign="top">
            <td>
                <p>Mutation - Verify Account</p>
                <pre>
mutation {
  confirmEmail(verifyToken:"$2a$12$0JF52vUb") {
    id
  }
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
  "data": {
    "confirmEmail": {
      "id": "5dbea9572dc7477b347b722e"
    }
  }
}
                </pre>
            </td>
        </tr>
        <tr></tr>
        <tr valign="top">
            <td>
                <p>Query - Search employees</p>
                <pre>
query {
  search(page:1,searchValue:"john"){
    employeesList{
        _id,
        name,
        email,
        location,
        department,
        createdAt
    },
    totalEmployees
  }
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
  "data": {
    "search": {
      "employeesList": [
        {
          "_id": "5db0576a0b0ac596182a9738",
          "name": "john doe",
          "email": "johndoe@gmail.com",
          "location": "beirut",
          "department": "designer",
           "createdAt": "2019-10-22T19:35:48.585Z"
        }
      ],
      "totalEmployees": "1"
    }
  }
}
                </pre>
            </td>
        </tr>
                <tr></tr>
        <tr valign="top">
            <td>
                <p>Query - Get employees list</p>
                <pre>
query {
  employees(page:1){
    employeesList{
        _id,
        name,
        email,
        location,
        department,
        createdAt
    },
    totalEmployees
  }
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
  "data": {
    "employees": {
      "employeesList": [
        {
          "_id": "5db0576a0b0ac596182a9738",
          "name": "john doe",
          "email": "johndoe@gmail.com",
          "location": "beirut",
          "department": "designer",
           "createdAt": "2019-10-22T19:35:48.585Z"
        }
      ],
      "totalEmployees": "1"
    }
  }
}
                </pre>
            </td>
        </tr>
                <tr></tr>
        <tr valign="top">
            <td>
                <p>Mutation - Create Employee</p>
                <pre>
mutation {
  createEmployee(
    name: "john doe", 
    email:"johndoe@gmail.com",
    location:"beirut",
    department:"designer"
    imageUrl:"http://imageurl.com"
  ) {
    _id,
    name,
    email,
    location,
    imageUrl,
    createdAt
  }
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
  "data": {
    "createEmployee": {
      "_id": "5daefe339614e464c8f6a4fc",
      "name": "john doe",
      "email": "johndoe@gmail.com",
      "location": "beirut",
      "imageUrl": "http://imageurl.com",
      "createdAt": "2019-10-22T19:35:48.585Z"
    }
  }
}
                </pre>
            </td>
        </tr>
                        <tr></tr>
        <tr valign="top">
            <td>
                <p>Mutation - Update Employee</p>
                <pre>
mutation {
  updateEmployee(
    id:"5daf5a1491e05892206059c8",
    name: "john doe", 
    email:"johndoe@gmail.com",
    location:"beirut",
    department:"developer"
    imageUrl:"http://imageurl.com"
  ) {
    _id,
    name,
    email,
    location,
    department,
    imageUrl,
    createdAt
  }
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
  "data": {
    "updateEmployee": {
      "_id": "5daf5a1491e05892206059c8",
      "name": "john doe",
      "email": "johndoe@gmail.com",
      "location": "beirut",
      "department": "developer",
      "imageUrl": "http://imageurl.com",
      "createdAt": "2019-10-22T19:35:48.585Z"
    }
  }
}
                </pre>
            </td>
        </tr>
                                <tr></tr>
        <tr valign="top">
            <td>
                <p>Mutation - Remove Employee</p>
                <pre>
mutation {
  remove(id:"5daaaea24ae13370c0257e79") {
    _id
  }
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
  "data": {
    "remove": {
      "_id": "5daaaea24ae13370c0257e79"
    }
  }
}
                </pre>
            </td>
        </tr>
        
    </tbody>
</table>


### ReactJS Core Structure
    client
      ├── src
      │   ├── components
      │   ├── config
      │   ├── pages
      │   └── utils
      ├── .eslintrc
      ├── .prettierrc
      └── package.json

### NodeJS Core Structure
    server
	  ├── src
      │   ├── interfaces
      │   ├── loaders
      │   ├── loaders
      │   ├── middleware
      │   ├── models
      │   ├── routes
      │   ├── schema
      |   |     ├── index.ts
      |   |     ├── mutations.ts
      |   |     ├── query.ts
      |   |     ├── employers
      |   |     |     ├──fields
      |   |     |     ├──types
      |   |     |     └──resolvers.ts
      |   |     ├──users
      |   |     |     ├──fields
      |   |     |     ├──types
      |   |     |     └──resolvers.ts
      │   ├── services
      |	  └── templates
      ├── tests
      ├── .gitignore
      ├── docker-compose.yml
      ├── Dockerfile
      ├── Jenkinsfile
      ├── nodemon.json
      ├── package.json
      ├── tsconfig.json
      └── tslint.json

## 🏗 Setup App

### Setup Server
>1- Edit environment variables in `/server/docker-compose.yml`

>2- Running: `docker-compose up -d`


### Setup Client
>1- Configure server endpoints in `/client/src/config/index.js`

>2- Dev: `yarn start`

>3- Lint: `yarn lint`

>4- Prod: `yarn build`