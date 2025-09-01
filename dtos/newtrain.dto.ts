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
