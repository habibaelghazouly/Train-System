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
