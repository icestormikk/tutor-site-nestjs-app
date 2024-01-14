import { Test, TestingModule } from '@nestjs/testing';
import { TeacherResponsesController } from './teacher-responses.controller';
import { TeacherResponsesService } from './teacher-responses.service';

describe('TeacherResponsesController', () => {
  let controller: TeacherResponsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherResponsesController],
      providers: [TeacherResponsesService],
    }).compile();

    controller = module.get<TeacherResponsesController>(
      TeacherResponsesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
