import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { ListChallengesUseCase } from './ListChallenges.useCase';

describe('List Challenge Use Case', () => {
  let listUseCase: ListChallengesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListChallengesUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    listUseCase = module.get<ListChallengesUseCase>(ListChallengesUseCase);
  });

  it('should be defined', () => {
    expect(listUseCase).toBeDefined();
  });
});
