FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install curl for docker-compose healthchecks
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
COPY . .

# We are using Vite dev server for demo purposes so it hot reloads if needed, 
# and easily serves exactly what we see locally.
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
