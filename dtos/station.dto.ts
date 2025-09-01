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

