import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from '@graphql-tools/schema';
import http from "http";
import { typeDefs } from "./Schema.js";
import { resolvers } from "./resolvers";
import Pool from "./config";
import models from "./models";

const port = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache:"bounded",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true })
  ],
});

server.start().then(()=>{
  app.use(
    "/api",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        //const token = req.headers.token;
        const db = Pool;
        return { db, models };
      },
    })
  );

});



httpServer.listen({port: port},() => {
  console.log(`Server running on http://localhost:${port}/api`);
});

