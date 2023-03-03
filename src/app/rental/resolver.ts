import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Car } from "../car/car";
import { Driver } from "../driver/driver";
import service from "../shared/service";
import { Rental } from "./rental";
import { RentalInput } from "./rentalInput";

const rentalService = service.rental;
const driverService = service.driver;
const carService = service.car;

@Resolver(() => Rental)
export class RentalResolver {
  @Query(() => [Rental])
  rentals(): Rental[] {
    return rentalService.getMany();
  }

  @Mutation(() => Rental)
  createRental(@Arg("input") input: RentalInput): Rental {
    const rental = new Rental(
      input.startDate,
      input.driverId,
      input.carId,
      input.reason
    );
    return rentalService.createRental(rental);
  }

  @Mutation(() => Rental)
  closeRental(@Arg("id") id: number, @Arg("endDate") endDate: Date): Rental {
    return rentalService.closeRental(id, endDate);
  }

  @FieldResolver(() => Rental)
  driver(@Root() rental: Rental): Driver | undefined {
    return driverService.get(rental.driverId);
  }

  @FieldResolver(() => Rental)
  car(@Root() rental: Rental): Car | undefined {
    return carService.get(rental.carId);
  }
}
