import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { typeDefs } from "./Schema.js";
import { resolvers } from "./resolvers/index.js";
import Pool from "./config/index.js";
import models from "./models/index.js";

const port = 3002;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/api",
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      token: req.headers.token;
      const db = Pool;
      return { db, models };
    },
  })
);


await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
console.log(`Server running on port http://localhost:${port}/api`);
