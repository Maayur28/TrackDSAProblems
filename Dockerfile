# Use an official Node.js runtime as a base image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

ARG password
ARG TOKEN_SECRET
ARG MONGODB_URI

ENV password=$password
ENV TOKEN_SECRET=$TOKEN_SECRET
ENV MONGODB_URI=$MONGODB_URI

RUN echo "The ENV variable password value is $password"
RUN echo "The ENV variable TOKEN_SECRET value is $TOKEN_SECRET"
RUN echo "The ENV variable MONGODB_URI value is $MONGODB_URI"

# Install the application dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run your application
CMD [ "node", "index.js" ]
