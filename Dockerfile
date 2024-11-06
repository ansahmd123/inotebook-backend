# Use the official Node.js image as the base
FROM node:17

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the app port
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
