import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from '@graphql-tools/schema';
import http from "http";
import jwt from "jsonwebtoken"
import { typeDefs } from "./Schema.js";
import { resolvers } from "./resolvers";
import Pool from "./config";
import models from "./models";

const port = process.env.PORT || 3000;
const JWT_SECRETE:any = process.env.JWT_SECRETE


const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  introspection: true,
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
    bodyParser.json({limit:'100kb'}),
    bodyParser.urlencoded({
      extended: true,
      limit: '100kb',
    }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        let user = null

        try{
          if(token){
            user = jwt.verify(token, JWT_SECRETE)
          }
        }catch(error){
          throw new Error("Invalid token")
        }
        const db = Pool;
        return { db, models, user};
      },
    })
  );

});



httpServer.listen({port: port},() => {
  console.log(`Server running on http://localhost:${port}/api`);
});

