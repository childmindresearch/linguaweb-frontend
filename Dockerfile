FROM node:18.14 as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18.14-slim

WORKDIR /app
ENV VITE_API_URL=http://localhost:8000

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package*.json /app/

EXPOSE 3000

CMD ["node", "build/index.js"]
