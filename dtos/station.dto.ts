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
