// GET all trains
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

// GET train by ID
export class getTrainResponseDto {
  id: number;
  name: string;

  constructor(train: any) {
    this.id = train.id;
    this.name = train.name;
  }

  static fromEntity(train: any): getTrainResponseDto {
    return new getTrainResponseDto(train);
  }
}

// POST new train
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

// Update/edit a train
export class updateTrainResponseDto {
  id: number;
  name: string;

  constructor(train: any) {
    this.id = train.id;
    this.name = train.name;
  }

  static fromEntity(train: any): updateTrainResponseDto {
    return new updateTrainResponseDto(train);
  }
}