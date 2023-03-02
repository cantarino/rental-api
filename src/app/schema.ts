import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CarResolver } from "./car/resolver";
import { DriverResolver } from "./driver/resolver";

export async function buildGraphQLSchema() {
  return buildSchema({
    resolvers: [CarResolver, DriverResolver],
    validate: false,
  });
}
