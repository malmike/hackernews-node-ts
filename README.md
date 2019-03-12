# hackernews-node-ts
This is a hackernews clone application built in nodejs and typescript

## Usage

### 1. Clone repository & install dependencies
- Ensure you have node, npm/ yarn installed
```sh
git clone https://github.com/malmike/hackernews-node-ts.git
cd hackernews-node-ts
yarn install # or `npm install`
```

# Compiling the application from typescript to javascript
- The `tsconfig.json` file contains the configurations for compiling the application from typescript to javascript.
- To compile the application run `yarn tsc`


## Usage

### 1. Clone repository & install dependencies

```sh
git clone https://github.com/howtographql/graphql-js
cd graphql-js
yarn install # or `npm install`
```

### 2. Install the Prisma CLI

```sh
yarn global add prisma
```

### 3. Deploy the Prisma database service

```sh
prisma deploy
```

When prompted where (i.e. to which Prisma server) you want to deploy your service, choose the **Demo server** which can be used for free in Prisma Cloud. If you haven't done so already, you will be asked to register with Prisma Cloud (which you can do via GitHub). For the following prompts in the terminal you can select the suggested values by hitting Enter. (If you have Docker installed, you can also choose to deploy Prisma locally by creating a new database.)

### 4. Start the server & open Playground

To interact with the API in a GraphQL Playground, all you need to do is execute the `start` script defined in `package.json`:

```sh
yarn start-dev
```
