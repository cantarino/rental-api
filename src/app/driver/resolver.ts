import { Arg, Mutation, Query, Resolver } from "type-graphql";
import service from "../shared/service";
import { Driver } from "./driver";
import { DriverFilter } from "./driverFilter";
import { DriverInput } from "./driverInput";

const driverService = service.driver;

@Resolver()
export class DriverResolver {
  @Query(() => Driver, { nullable: true })
  driver(@Arg("id", () => Number) id: number): Driver | undefined {
    return driverService.get(id);
  }

  @Query(() => [Driver])
  drivers(
    @Arg("name", () => String, { nullable: true }) name: string
  ): Driver[] {
    return driverService.getMany(new DriverFilter(name));
  }

  @Mutation(() => Driver)
  registerDriver(@Arg("input") input: DriverInput): Driver {
    const driver = new Driver(input.name);

    return driverService.create(driver);
  }

  @Mutation(() => Driver)
  updateDriver(
    @Arg("id", () => Number) id: number,
    @Arg("input") input: DriverInput
  ): Driver | undefined {
    const driver = new Driver(input.name);

    return driverService.update(id, driver);
  }

  @Mutation(() => Boolean)
  deleteDriver(@Arg("id", () => Number) id: number): boolean {
    return driverService.delete(id);
  }
}
