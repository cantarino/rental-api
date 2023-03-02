import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CarResolver } from "./car/resolver";

export async function buildGraphQLSchema() {
  return buildSchema({
    resolvers: [CarResolver],
    validate: false,
  });
}
