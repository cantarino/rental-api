import { Field, InputType } from "type-graphql";

@InputType()
export class CarInput {
  @Field(() => String)
  licensePlate: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  brand: string;
}
