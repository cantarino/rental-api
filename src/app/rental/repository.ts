import { Rental } from "./rental";
import { RentalFilter } from "./rentalFilter";

export interface IRentalRepository {
  get(id: number): Rental | undefined;
  getMany(filter?: RentalFilter): Rental[];
  create(rental: Rental): Rental;
  update(id: number, rental: Rental): Rental;
}

export class RentalRepository implements IRentalRepository {
  private rentals: Rental[];
  constructor() {
    this.rentals = [];
  }

  public get(id: number): Rental | undefined {
    return this.rentals.find((x) => x.id == id);
  }

  public getMany(filter?: RentalFilter): Rental[] {
    if (!filter) return this.rentals;
    var rentals = this.rentals.filter(
      (x) => x.carId == filter.carId || x.driverId == filter.driverId
    );

    return rentals;
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
