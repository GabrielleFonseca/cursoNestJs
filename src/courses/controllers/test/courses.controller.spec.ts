import { CoursesService } from './../../services/courses.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from '../courses.controller';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: {
            createCourse: jest.fn(),
            findAllCourses: jest.fn(),
            findCourseById: jest.fn(),
            updateCourse: jest.fn(),
            deleteCourse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createCourse', () => {
    it('should create a course', () => {
      const course = {
        id: 1,
        name: 'NestJS',
        description: 'NestJS course',
        tags: ['nestjs', 'nodejs', 'typescript', 'backend', 'javascript'],
      };

      controller.createCourse(course);

      expect(service.createCourse).toHaveBeenCalledWith(course);
    });
  });

  describe('findAllCourses', () => {
    it('should find all courses', () => {
      controller.findAllCourses();

      expect(service.findAllCourses).toHaveBeenCalled();
    });
  });

  describe('findOneCourse', () => {
    it('should find one course by id', () => {
      const id = 1;

      controller.findOneCourse(id);

      expect(service.findCourseById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateCourse', () => {
    it('should update a course', () => {
      const id = 1;
      const course = {
        name: 'NestJS',
        description: 'NestJS course',
        tags: ['nestjs', 'nodejs', 'typescript', 'backend', 'javascript'],
      };

      controller.updateCourse(id, course);

      expect(service.updateCourse).toHaveBeenCalledWith(id, course);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', () => {
      const id = 1;

      controller.deleteCourse(id);

      expect(service.deleteCourse).toHaveBeenCalledWith(id);
    });
  });
});
