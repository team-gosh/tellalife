FROM node:16.3-alpine
WORKDIR /tellalife
EXPOSE 3000
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install&&npm run build
CMD ["npm", "start"]
