import { Arg, Mutation, Query, Resolver } from "type-graphql";
import service from "../shared/service";
import { Car } from "./car";
import { CarFilter } from "./carFilter";
import { CarInput } from "./carInput";

const carService = service.car;

@Resolver()
export class CarResolver {
  @Query(() => Car, { nullable: true })
  car(@Arg("id", () => Number) id: number): Car | undefined {
    return carService.get(id);
  }

  @Query(() => [Car])
  cars(
    @Arg("brand", () => String, { nullable: true }) brand: string,
    @Arg("color", () => String, { nullable: true }) color: string
  ): Car[] {
    return carService.getMany(new CarFilter(brand, color));
  }

  @Mutation(() => Car)
  registerCar(@Arg("input") input: CarInput): Car {
    const car = new Car(input.licensePlate, input.color, input.brand);

    return carService.create(car);
  }

  @Mutation(() => Car)
  updateCar(
    @Arg("id", () => Number) id: number,
    @Arg("input") input: CarInput
  ): Car | undefined {
    const car = new Car(input.licensePlate, input.color, input.brand);

    return carService.update(id, car);
  }

  @Mutation(() => Boolean)
  deleteCar(@Arg("id", () => Number) id: number): boolean {
    return carService.delete(id);
  }
}
