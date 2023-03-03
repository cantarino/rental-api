import { Field, InputType } from "type-graphql";

@InputType()
export class RentalInput {
  @Field(() => Date)
  startDate: Date;

  @Field(() => Number)
  driverId: number;

  @Field(() => Number)
  carId: number;

  @Field(() => String)
  reason: string;
}
