import { ICarRepository } from "../car/repository";
import { IDriverRepository } from "../driver/repository";
import errors from "../shared/errors";
import { Rental } from "./rental";
import { RentalFilter } from "./rentalFilter";
import { IRentalRepository } from "./repository";

export class RentalService {
  private rentalRepository: IRentalRepository;
  private driverRepository: IDriverRepository;
  private carRepository: ICarRepository;
  constructor(
    rentalRepository: IRentalRepository,
    driverRepository: IDriverRepository,
    carRepository: ICarRepository
  ) {
    this.rentalRepository = rentalRepository;
    this.driverRepository = driverRepository;
    this.carRepository = carRepository;
  }

  public getMany(): Rental[] {
    return this.rentalRepository.getMany();
  }

  public createRental(rental: Rental): Rental {
    const driver = this.driverRepository.get(rental.driverId);
    if (!driver) throw errors.driverNotFound;

    const car = this.carRepository.get(rental.carId);
    if (!car) throw errors.carNotFound;

    const filter = new RentalFilter(rental.driverId, rental.carId);
    const pastRentals = this.rentalRepository.getMany(filter);

    const anyActiveCarRentals =
      pastRentals.filter((x) => x.carId == rental.carId && !x.endDate).length >
      0;
    if (anyActiveCarRentals) throw errors.carAlreadyRented;

    const anyActiveDriverRentals =
      pastRentals.filter((x) => x.driverId == rental.driverId && !x.endDate)
        .length > 0;
    if (anyActiveDriverRentals) throw errors.driverAlreadyAssigned;

    return this.rentalRepository.create(rental);
  }

  public closeRental(id: number, endDate: Date): Rental {
    let rental = this.rentalRepository.get(id);
    if (!rental) throw errors.rentalNotFound;
    if (rental.endDate) throw errors.rentalAlreadyClosed;
    rental.endDate = endDate;

    return this.rentalRepository.update(id, rental);
  }
}
