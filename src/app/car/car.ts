import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Car {
  constructor(licensePlate: string, color: string, brand: string) {
    this.licensePlate = licensePlate;
    this.color = color;
    this.brand = brand;
  }

  @Field(() => Number)
  id: number;

  @Field(() => String)
  licensePlate: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  brand: string;
}
