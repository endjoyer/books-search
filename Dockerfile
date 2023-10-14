FROM node:lts as dependencies
WORKDIR /books-search
COPY package.json  ./
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /books-search
COPY . .
COPY --from=dependencies /books-search/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /books-search
ENV NODE_ENV production

COPY --from=builder /books-search/public ./public
COPY --from=builder /books-search/package.json ./package.json
COPY --from=builder /books-search/.next ./.next
COPY --from=builder /books-search/node_modules ./node_modules
COPY --from=builder /books-search/next.config.js ./next.config.js

EXPOSE 3000
CMD ["npm", "start"]

