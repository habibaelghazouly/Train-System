// GET trip by id
export class getTripResponseDto {
  id: number;
  stationID : number;
  trainID : number;
  station_order : number;

  constructor(trip: any) {
    this.id = trip.id;
    this.stationID = trip.station_id
    this.trainID = trip.train_id;
    this.station_order = trip.station_order;
  }

  static fromEntity(trip: any): getTripResponseDto {
    return new getTripResponseDto(trip);
  }
}

// Get available trips
export class TripResponseDto {
  train_id: number;
  train_name: string;
  start_city: number;
  dest_city: number;

  constructor(data: any) {
    this.train_id = data.train_id;
    this.train_name = data.train_name;
    this.start_city = data.start_city;
    this.dest_city = data.dest_city;
  }

  static fromEntities(trips: any[]): TripResponseDto[] {
    return trips.map(trip => new TripResponseDto(trip));
  }
}

// POST a trip
export class newTripResponseDto {
  id: number;
  stationID: number;
  trainID: number;
  stationOrder: number;

  constructor(trip: any) {
    this.id = trip.id;
    this.stationID = trip.station_id;
    this.trainID = trip.train_id;
    this.stationOrder = trip.station_order;
  }

  static fromEntity(trip: any): newTripResponseDto {
    return new newTripResponseDto(trip);
  }
}
  
// PATCH/edit a trip
export class updateTripResponseDto {
  id: number;
  stationID: number;
  trainID: number;
  stationOrder: number;

  constructor(trip: any) {
    this.id = trip.id;
    this.stationID = trip.station_id;
    this.trainID = trip.train_id;
    this.stationOrder = trip.station_order;
  }

  static fromEntity(trip: any): updateTripResponseDto {
    return new updateTripResponseDto(trip);
  }
}

// DELETE a trip
export class deleteTripResponseDto {
  id: number;

  constructor(trip: any) {
    this.id = trip.id;
  }

  static fromEntity(trip: any): deleteTripResponseDto {
    return new deleteTripResponseDto(trip);
  }
}