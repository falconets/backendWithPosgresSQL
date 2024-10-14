import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import http from "http";
import { typeDefs } from "./Schema.js";
import { resolvers } from "./resolvers";
import data from "./config";
import models from "./models";
import { verifyToken } from "./utils/VerifyToken.js";

const port = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Configure ApolloServer
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

// Define the CORS options
const corsOptions = {
  origin: [
    "http://localhost:5073",
    "https://hubadmin-production.up.railway.app",
    "http://localhost:4073",
    "https://busticketfrontend-production.up.railway.app",
  ], // trusted domains
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Start Apollo Server and apply middleware
server.start().then(() => {
  app.use(
    "/api",
    cors(corsOptions), // Apply CORS middleware
    bodyParser.json({ limit: "100kb" }),
    bodyParser.urlencoded({
      extended: true,
      limit: "100kb",
    }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = verifyToken({ token });
        const db = data.Pool;
        const firestore = data.firestore;
        const mtn = data.mtn;
        return { db, models, user, firestore, mtn };
      },
    })
  );
});

// Simple route to check server health
app.get("/schedule", (req, res) => {
  res.send("I'm OK!");
});

// Start the HTTP server
httpServer.listen({ port }, () => {
  console.log(`Server running on http://localhost:${port}/api`);
});
