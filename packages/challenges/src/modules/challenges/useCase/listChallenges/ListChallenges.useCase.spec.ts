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

  it('should be list all challenges', async () => {
    const challengeData = {
      title: 'Remove Challenge',
      description: 'should be removing one challenge by id',
    };

    await challengeRepository.create(challengeData);
    await challengeRepository.create(challengeData);

    const challenges = await listUseCase.execute();

    const expectedChallengeData = {
      ...challengeData,
      id: expect.any(String),
    };

    expect(challenges.length).toBe(2);
    expect(challenges).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedChallengeData),
        expect.objectContaining(expectedChallengeData),
      ]),
    );
  });
});
