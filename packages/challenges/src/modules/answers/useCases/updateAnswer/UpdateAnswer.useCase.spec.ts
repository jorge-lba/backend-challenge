import { Test, TestingModule } from '@nestjs/testing';
import { AnswerInMemoryRepository } from '../../repositories/inMemory/AnswerInMemory.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';
import { UpdateAnswerUseCase } from './UpdateAnswer.useCase';

describe('Update Answer Use Case', () => {
  let updateAnswerUseCase: UpdateAnswerUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAnswerUseCase,
        {
          provide: AnswerRepository,
          useClass: AnswerInMemoryRepository,
        },
      ],
    }).compile();

    updateAnswerUseCase = module.get<UpdateAnswerUseCase>(UpdateAnswerUseCase);
  });

  it('should be defined', () => {
    expect(updateAnswerUseCase).toBeDefined();
  });
});
