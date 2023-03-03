import { Field, ObjectType } from "type-graphql";
import { Car } from "../car/car";
import { Driver } from "../driver/driver";

@ObjectType()
export class Rental {
  constructor(
    startDate: Date,
    driverId: number,
    carId: number,
    reason: string
  ) {
    this.startDate = startDate;
    this.driverId = driverId;
    this.carId = carId;
    this.reason = reason;
  }

  @Field(() => Number)
  id: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate: Date;

  @Field(() => Number)
  driverId: number;

  @Field(() => Driver)
  driver: Driver;

  @Field(() => Number)
  carId: number;

  @Field(() => Car)
  car: Car;

  @Field(() => String)
  reason: string;
}
