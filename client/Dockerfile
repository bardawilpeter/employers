#Getting latest node image from docker hub
FROM node:latest
#add work directory 
WORKDIR /app
#copying package.json to work directory
COPY package.json package.json
#runing npm install to get node_modules
RUN npm install
#install create-react-app globally
RUN npm install -g create-react-app
#copying all files
COPY . .
#Exposing the application to port 3000
EXPOSE 3000
#Runing npm start as command to run the application
CMD [ "npm", "start" ]