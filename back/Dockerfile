FROM node:18

WORKDIR /app

COPY . .

RUN npm install

# Сначала удаляем любую строку, начинающуюся с "JWT_SECRET=", а затем добавляем новую
RUN sed -i '/^JWT_SECRET=/d' .env && \
    node -e "const crypto = require('crypto'); console.log('JWT_SECRET=' + crypto.randomBytes(32).toString('hex'))" >> .env

EXPOSE 5000
CMD ["npm", "start"]
