import { Test, TestingModule } from '@nestjs/testing';
import { UseCaseError } from '../../../errors/UseCase.error';
import { ChallengeInMemoryRepository } from '../../challenges/repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../challenges/repositories/prisma/Challenge.repository';
import { IAnswer } from '../interfaces/IAnswer.interface';
import { AnswerInMemoryRepository } from '../repositories/inMemory/AnswerInMemory.repository';
import { AnswerRepository } from '../repositories/prisma/Answer.repository';
import { SendAnswerUseCase } from './SendAnswer.useCase';

describe('Send Answer Use Case', () => {
  let sendAnswerUseCase: SendAnswerUseCase;
  let challengeRepository: ChallengeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendAnswerUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
        {
          provide: AnswerRepository,
          useClass: AnswerInMemoryRepository,
        },
      ],
    }).compile();

    sendAnswerUseCase = module.get<SendAnswerUseCase>(SendAnswerUseCase);
    challengeRepository = module.get<ChallengeRepository>(ChallengeRepository);
  });

  it('should be defined', () => {
    expect(sendAnswerUseCase).toBeDefined();
  });

  it('should be sending answer', async () => {
    const challenge = await challengeRepository.create({
      title: 'Send first answer',
      description: 'Send first answer',
    });

    const answer = {
      challengeId: challenge.id,
      link: 'https://github.com/jorge-lba/ignite-tests-challenge',
    } as IAnswer;

    const response = await sendAnswerUseCase.execute(answer);

    const expectedResponse = {
      id: expect.any(String),
      challengeId: challenge.id,
      link: answer.link,
      status: 'Pending',
      grade: null,
    };

    expect(response).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should be record the response with error status if the challenge does not exist', async () => {
    const answer = {
      challengeId: 'non-existent-challenge-id',
      link: 'https://github.com/jorge-lba/ignite-tests-challenge',
    } as IAnswer;

    const response = await sendAnswerUseCase.execute(answer);

    const expectedAnswer = {
      id: expect.any(String),
      challengeId: null,
      link: answer.link,
      status: 'Error',
      grade: null,
    };

    const expectedErrorMessage = 'challengeId is invalid';

    expect(response).toBeInstanceOf(UseCaseError);
    expect(response.errors).toEqual(
      expect.arrayContaining([expectedErrorMessage]),
    );
    expect(response.body.answer).toEqual(
      expect.objectContaining(expectedAnswer),
    );
  });

  it('should be record the response with error status if the challenge id is undefined', async () => {
    const answer = {
      link: 'https://github.com/jorge-lba/ignite-tests-challenge',
    } as IAnswer;

    const response = await sendAnswerUseCase.execute(answer);

    const expectedAnswer = {
      id: expect.any(String),
      challengeId: null,
      link: answer.link,
      status: 'Error',
      grade: null,
    };

    const expectedErrorMessage = 'challengeId is required';

    expect(response).toBeInstanceOf(UseCaseError);
    expect(response.errors).toEqual(
      expect.arrayContaining([expectedErrorMessage]),
    );
    expect(response.body.answer).toEqual(
      expect.objectContaining(expectedAnswer),
    );
  });
});
