export class TrainResponseDto {
  id: number;
  name: string;

  constructor(train: any) {
    this.id = train.id;
    this.name = train.name;
  }

  static fromEntities(trains: any[]): TrainResponseDto[] {
    return trains.map(train => new TrainResponseDto(train));
  }
}
