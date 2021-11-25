import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { UpdateChallengeUseCase } from './UpdateChallenge.useCase';

describe('Update Challenge Use Case', () => {
  let updateUseCase: UpdateChallengeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateChallengeUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    updateUseCase = module.get<UpdateChallengeUseCase>(UpdateChallengeUseCase);
  });

  it('should be defined', () => {
    expect(updateUseCase).toBeDefined();
  });
});
