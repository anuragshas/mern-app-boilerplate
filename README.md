# MERN Boilerplate - MongoDB, Express, React, NodeJS

## Dependencies 

- NodeJS (9+ preferred)
- Docker (CE is fine, 17+ preferred)

## Installation

1) `git clone <this_url> && cd <repo_name>`

2) `npm install`

3) Running the application
   - Development Mode (Client only): `npm run dev` then open `http://localhost:3000` in a browser
   - Production Bundle (Client only): `npm run build` then import the client code somewhere
   - Development Mode (Server only): `npm run dev-server` then open `http://localhost:3000` in a browser
   - Standalone (Client+Server): `npm start` then open `http://localhost:3000` in a browser
   - Dockerized /w MongoDB: `npm run start:docker` - more to come

## Usage

A good place to start would be the .env files. Copy `.env.default` in the root of the project and name the copy `.env`. Replace the values as you see fit. Next, open `docker-compose.yml` and replace the text 'boilerplate' with the app name you put in the env file. After that, you should be in a good place to start customizing it.

## Assumptions

- You have all dependencies installed and are using NPM or Yarn
- Your user account is part of the docker group for sudo access

## Transpiling/Bundling/Polyfills

We currently use babel configured with preset-env, preset-react and preset-stage-0. Eventually the polyfill.io cdn will be primarily used.

## Resources/Sources

### Lifecycle scripts

- npm start
- npm run dev
- npm run dev-server
- npm run build
- npm test