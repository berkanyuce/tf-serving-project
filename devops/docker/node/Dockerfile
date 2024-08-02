# Base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . ./

# Build the application
RUN npm run build

# Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
