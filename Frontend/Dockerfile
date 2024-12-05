# Sử dụng node image chính thức từ Docker Hub
FROM node:16-alpine

# Set working directory trong container
WORKDIR /app

# Copy file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn của project vào container
COPY . .

# Build ứng dụng (nếu có script build trong package.json)
RUN npm run build

# Expose port (thường là 3000 nếu là React/Vue, thay đổi tùy ứng dụng)
EXPOSE 3000

# Chạy ứng dụng (thường là script start trong package.json)
CMD ["npm", "start"]
