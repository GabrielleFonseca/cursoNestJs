import { CoursesService } from '../courses.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CoursesModule } from '../courses.module';
import { CoursesController } from '../courses.controller';

describe('CoursesModule', () => {
  let coursesModule: CoursesModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule],
      controllers: [CoursesController],
      providers: [CoursesService],
      exports: [],
    }).compile();

    coursesModule = module.get<CoursesModule>(CoursesModule);
  });

  it('should be defined', () => {
    expect(coursesModule).toBeDefined();
  });
});
