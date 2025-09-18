# Этап сборки приложения
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

# Проверка содержимого папки build (это поможет при отладке)
# RUN ls -la /app/build

# Этап раздачи приложения с Nginx
FROM nginx:alpine
# Удаляем дефолтный конфиг Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Копируем наш кастомный конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение в директорию Nginx
# Убедитесь, что /app/build действительно содержит ваши статические файлы
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
