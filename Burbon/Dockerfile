FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install --only=production
CMD ["node", "/app/src/index.js"]