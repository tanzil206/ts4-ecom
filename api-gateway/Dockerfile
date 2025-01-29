# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code
COPY . .

# Expose the API Gateway port
EXPOSE 3000

# Start the API Gateway
CMD ["npm", "run", "start"]
