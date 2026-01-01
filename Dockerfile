# Базовий Node образ
FROM node:18-alpine

# Робоча директорія в контейнері
WORKDIR /app

# Копіюємо package.json і встановлюємо залежності
COPY package*.json ./
RUN npm ci --only=production

# Копіюємо весь код у контейнер
COPY . .

# Відкриваємо порт
EXPOSE 3000

# Команда для запуску Fastify
CMD ["node", "src/server.js"]
