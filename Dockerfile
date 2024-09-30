# Stage 1: Build the React app with Vite
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the React app using Vite
RUN npm run build

# Stage 2: Serve the app using a lightweight web server (nginx)
FROM nginx:alpine

# Copy built files from the previous stage to the nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the host machine
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
