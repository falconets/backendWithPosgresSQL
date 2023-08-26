import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { typeDefs } from "./Schema.js";
import { resolvers } from "./resolvers";
import Pool from "./config";
import models from "./models";

const port = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(()=>{
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

});



httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/api`);
});

