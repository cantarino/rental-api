class AppError {
  constructor(
    public readonly message: string,
    public readonly statusCode = 400
  ) {}
}

export default {
  carNotFound: new AppError("car not found"),
  driverNotFound: new AppError("driver not found"),
  rentalNotFound: new AppError("rental not found"),
  rentalAlreadyClosed: new AppError("rental already closed"),
  carAlreadyRented: new AppError("car already rented"),
  driverAlreadyAssigned: new AppError("driver already assigned to a car"),
};
