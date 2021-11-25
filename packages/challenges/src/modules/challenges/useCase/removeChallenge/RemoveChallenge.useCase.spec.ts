import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';

describe('Remove Challenge Use Case', () => {
  let removeChallengeUseCase: RemoveChallengeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveChallengeUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    removeChallengeUseCase = module.get<RemoveChallengeUseCase>(
      RemoveChallengeUseCase,
    );
  });

  it('should be defined', () => {
    expect(removeChallengeUseCase).toBeDefined();
  }
});
