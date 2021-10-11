FROM node:12-alpine
COPY ./Burbon ./api/
WORKDIR /api/
RUN npm install --only=production
CMD ["node", "./src/index.js"]