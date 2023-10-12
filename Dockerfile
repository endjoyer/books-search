# Базовый образ - Node.js
FROM node:16

# Установка рабочей директории в контейнере
WORKDIR /src/app

# Копирование файлов package.json и package-lock.json (если есть)
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода приложения
COPY . .

# Запуск тестов
RUN npm test

# Сборка приложения
RUN npm run build

# Объявление порта, на котором будет работать приложение
EXPOSE 3000

# Запуск приложения
CMD [ "npm", "run", "dev" ]

# Собрать и запустить приложение
# docker build -t books-search .
# docker run -p 3000:3000 books-search

