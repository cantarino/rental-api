import { Field, InputType } from "type-graphql";

@InputType()
export class DriverInput {
  @Field(() => String)
  name: string;
}
