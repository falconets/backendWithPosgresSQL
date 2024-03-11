import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import helmet from 'helmet'
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import http from "http";
import { typeDefs } from "./Schema.js";
import { resolvers } from "./resolvers";
import Pool from "./config";
import models from "./models";
import { verifyToken } from "./utils/VerifyToken.js";

const port = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  introspection: true,
  cache: "bounded",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

const corsOptions = {
  origin: ['http://localhost:5073', 'https://hubadmin-production.up.railway.app', 'http://localhost:4073'], // Set this to your trusted domains or '*' for any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

server.start().then(() => {
  app.use(
    "/api",
    //helmet(),
    cors(corsOptions),
    bodyParser.json({ limit: "100kb" }),
    bodyParser.urlencoded({
      extended: true,
      limit: "100kb",
    }),
    // (req, res, next) => {
    //   res.setHeader(
    //     'Content-Security-Policy',
    //     `default-src 'self'; script-src 'self' https://trusted-scripts.com 'nonce-${res.locals.nonce}'; style-src 'self' https://trusted-styles.com 'unsafe-inline'`
    //   );
    //   next();
    // },
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = verifyToken({ token: token });
        console.log('token', token)
        console.log('user', user)
        const db = Pool;
        return { db, models, user };
      },
    })
  );
});

httpServer.listen({ port: port }, () => {
  console.log(`Server running on http://localhost:${port}/api`);
});
