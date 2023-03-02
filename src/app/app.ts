import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildGraphQLSchema } from "./schema";

export async function buildApp() {
  const app = express();
  app.use(
    cors({
      origin: process.env.ORIGIN,
    })
  );

  const apolloServer = await buildApolloServer();

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  return app;
}

export async function buildApolloServer() {
  return new ApolloServer({
    schema: await buildGraphQLSchema(),
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
  });
}
