import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { RemoveChallengeUseCase } from './RemoveChallenge.useCase';

describe('Remove Challenge Use Case', () => {
  let removeChallengeUseCase: RemoveChallengeUseCase;
  let challengeRepository: ChallengeRepository;

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

    challengeRepository = module.get<ChallengeRepository>(ChallengeRepository);
  });

  it('should be defined', () => {
    expect(removeChallengeUseCase).toBeDefined();
  });

  it('should be removing one challenge by id', async () => {
    const challenge = {
      title: 'Remove Challenge',
      description: 'should be removing one challenge by id',
    };

    const challengeCreated = await challengeRepository.create(challenge);

    const response = await removeChallengeUseCase.execute(challengeCreated.id);

    expect(response).toBeUndefined();
  });
});
