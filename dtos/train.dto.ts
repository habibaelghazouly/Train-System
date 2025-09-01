//GET all trains

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

//POST new train
import { Train } from "@prisma/client";

export class newTrainResponseDto {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromEntity(train : Train): newTrainResponseDto {
    return new newTrainResponseDto(train.id, train.name);
  }

}
