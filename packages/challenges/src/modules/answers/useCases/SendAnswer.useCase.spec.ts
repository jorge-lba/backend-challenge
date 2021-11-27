import { Test, TestingModule } from '@nestjs/testing';
import { SendAnswerUseCase } from './SendAnswer.useCase';

describe('Send Answer Use Case', () => {
  let sendAnswerUseCase: SendAnswerUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendAnswerUseCase],
    }).compile();

    sendAnswerUseCase = module.get<SendAnswerUseCase>(SendAnswerUseCase);
  });

  it('should be defined', () => {
    expect(sendAnswerUseCase).toBeDefined();
  });
});
