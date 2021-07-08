FROM node:16.3-alpine
WORKDIR /tellalife
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]
