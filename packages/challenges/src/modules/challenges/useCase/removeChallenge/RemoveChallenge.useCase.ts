import { IChallengeRepository } from '../../repositories/IChallenge.repository';

export class RemoveChallengeUseCase {
  constructor(private readonly challengeRepository: IChallengeRepository) {}

  async execute() {
    return true;
  }
}
