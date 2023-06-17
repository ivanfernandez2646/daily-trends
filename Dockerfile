FROM ghcr.io/puppeteer/puppeteer:20.7.2

USER root

# Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    # TODO: move this to .env files (now for time it will be here)
    MONGO_URL=mongodb+srv://dailyTrendsAdmin:u6N4VZ613MrUJAuT@cluster0.8oczyau.mongodb.net/

# Install Nodejs
ENV NODE_VERSION=18.16.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# Workdir
WORKDIR /code

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build
CMD ["npm", "run", "start:prod"]