//GET all stations

export class StationResponseDto {
  id: number;
  name: string;

  constructor(station: any) {
    this.id = station.id;
    this.name = station.name;
  }

  static fromEntities(stations: any[]): StationResponseDto[] {
    return stations.map(station => new StationResponseDto(station));
  }
}

// GET station by id
export class getStationResponseDto {
  id: number;
  name: string;

  constructor(train: any) {
    this.id = train.id;
    this.name = train.name;
  }

  static fromEntity(train: any): getStationResponseDto {
    return new getStationResponseDto(train);
  }
}

//POST new station
import { Station } from "@prisma/client";

export class newStationResponseDto {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromEntity(station : Station): newStationResponseDto {
    return new newStationResponseDto(station.id, station.name);
  }

}

// UPDATE a station
export class updateStationResponseDto {
  id: number;
  name: string;

  constructor(station: any) {
    this.id = station.id;
    this.name = station.name;
  }

  static fromEntity(station: any): updateStationResponseDto {
    return new updateStationResponseDto(station);
  }
}

// DELETE station
export class deleteStationResponseDto {
  id: number;
  name: string;

  constructor(station: any) {
    this.id = station.id;
    this.name = station.name;
  }

  static fromEntity(station: any): deleteStationResponseDto {
    return new deleteStationResponseDto(station);
  }
}
