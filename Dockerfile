# Use an official Node.js image as the base
FROM node:latest as build-stage

# Set the working directory inside the container
WORKDIR /digital_web_app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the app's source code
COPY . .

# Build the Angular app
RUN npm run build

# Use a lightweight web server image as the base
FROM nginx:stable-alpine
COPY digital.conf /etc/nginx/conf.d/digital.conf
# Copy the built app from the previous stage to the nginx directory
COPY --from=build-stage /digital_web_app/dist/digital-signage /usr/share/nginx/html

# Expose port 8000
EXPOSE 5021

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
