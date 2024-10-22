import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import http from "http";
import { typeDefs } from "./Schema.js";
import { resolvers } from "./resolvers";
import connection from "./config";
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
    cookieParser(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const db = connection.Pool;
        const firestore = connection.firestore;
        const mtn = connection.mtn;

        console.log("Cookies received:", req.cookies);
        console.log("Token extracted:", req.cookies.token);

        const token = req.cookies.token || ""; // `req.cookies` contains parsed cookies

        if (!token) {
          console.log("No token found in cookies.");
          return { db, models, user: null, firestore, mtn, res }; // User not authenticated
        }

        // Verify the token (assuming verifyToken is your token verification function)
        let user;
        try {
          user = verifyToken({ token }); // Add token validation here
        } catch (error) {
          console.error("Error verifying token:", error);
          user = null; // Invalid token
        }

        console.log("Authenticated user:", user);

        return { db, models, user, firestore, mtn, res };
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
