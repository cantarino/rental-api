import { Rental } from "./../../src/app/rental/rental";
import { IRentalRepository } from "./../../src/app/rental/repository";

export class FakeRentalRepository implements IRentalRepository {
  rentals: Rental[];
  constructor() {
    this.rentals = [];
  }

  public get(id: number): Rental | undefined {
    return this.rentals.find((x) => x.id == id);
  }

  public getMany(): Rental[] {
    return this.rentals;
  }

  public create(rental: Rental): Rental {
    const id = this.rentals.length + 1;
    rental.id = id;
    this.rentals.push(rental);

    return rental;
  }

  public update(id: number, rental: Rental): Rental {
    const index = this.rentals.findIndex((x) => x.id == id);
    rental.id = id;
    this.rentals[index] = rental;

    return rental;
  }
}
