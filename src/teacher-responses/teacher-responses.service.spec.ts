import { Test, TestingModule } from '@nestjs/testing';
import { TeacherResponsesService } from './teacher-responses.service';

describe('TeacherResponsesService', () => {
  let service: TeacherResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherResponsesService],
    }).compile();

    service = module.get<TeacherResponsesService>(TeacherResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
