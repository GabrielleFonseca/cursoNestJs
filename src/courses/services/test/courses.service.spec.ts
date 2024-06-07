import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from '../courses.service';
import { Course } from '../../courses.entity';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursesService],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCourse', () => {
    it('should create a course', () => {
      const newCourse: Course = {
        id: 5,
        name: 'Vue',
        description: 'Vue course',
        tags: ['vue', 'frontend', 'javascript', 'html', 'css'],
      };
      service.createCourse(newCourse);
      expect(service.findCourseById(5)).toEqual(newCourse);
    });
  });

  describe('findAllCourses', () => {
    it('should return all courses', () => {
      const courses = service.findAllCourses();
      expect(courses.length).toBeGreaterThan(0);
    });
  });

  describe('findCourseById', () => {
    it('should return a course by ID', () => {
      const course = service.findCourseById(1);
      expect(course).toBeDefined();
      expect(course?.id).toEqual(1);
    });

    it('should return undefined if course does not exist', () => {
      const course = service.findCourseById(999);
      expect(course).toBeUndefined();
    });
  });

  describe('updateCourse', () => {
    it('should update a course', () => {
      const updatedCourse: Course = {
        id: 1,
        name: 'Updated NestJS',
        description: 'Updated NestJS course',
        tags: ['nestjs', 'nodejs', 'typescript', 'backend', 'javascript'],
      };
      service.updateCourse(1, updatedCourse);
      const course = service.findCourseById(1);
      expect(course?.name).toEqual('Updated NestJS');
    });

    it('should return undefined if course does not exist', () => {
      const updatedCourse: Course = {
        id: 999,
        name: 'Non-existent',
        description: 'This course does not exist',
        tags: ['non-existent'],
      };
      const result = service.updateCourse(999, updatedCourse);
      expect(result).toBeUndefined();
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', () => {
      service.deleteCourse(1);
      const course = service.findCourseById(1);
      expect(course).toBeUndefined();
    });

    it('should not delete if course does not exist', () => {
      service.deleteCourse(999);
      const courses = service.findAllCourses();
      expect(courses.length).toEqual(4); // Initial 4 courses remain
    });
  });
});
