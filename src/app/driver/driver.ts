import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Driver {
  constructor(name: string) {
    this.name = name;
  }

  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;
}
