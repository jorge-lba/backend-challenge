import { Module } from '@nestjs/common';
import { ChallengeRepository } from './repositories/prisma/Challenge.repository';
import { CreateChallengeUseCase } from './useCase/createChallenge/CreateChallenge.useCase';
import { CreateChallengeUseCaseResolver } from './useCase/createChallenge/CreateChallenge.resolver';
import { RemoveChallengeUseCase } from './useCase/removeChallenge/RemoveChallenge.useCase';
import { RemoveChallengeResolver } from './useCase/removeChallenge/RemoveChallenge.resolver';
import { UpdateChallengeUseCase } from './useCase/updateChallenge/UpdateChallenge.useCase';

@Module({
  providers: [
    ChallengeRepository,
    CreateChallengeUseCaseResolver,
    RemoveChallengeResolver,
    CreateChallengeUseCase,
    RemoveChallengeUseCase,
    UpdateChallengeUseCase,
  ],
})
export class ChallengesModule {}
