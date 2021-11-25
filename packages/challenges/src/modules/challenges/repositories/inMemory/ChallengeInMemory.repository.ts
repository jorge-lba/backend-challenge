import { Injectable } from '@nestjs/common';
import { CreateChallengeInput } from '../../dto/create-challenge.input';
import { IChallenge } from '../../interfaces/IChallenge.interface';
import { IChallengeRepository } from '../IChallenge.repository';

@Injectable()
export class ChallengeInMemoryRepository implements IChallengeRepository {
  private _challenges: IChallenge[] = [];

  async create(createChallengeInput: CreateChallengeInput) {
    const challenge = {
      ...createChallengeInput,
      id: `${Number(this._challenges.length) + 1}`,
      createdAt: new Date(),
    };

    this._challenges.push(challenge);

    return challenge;
  }
}
