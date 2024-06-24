import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from '../courses.service';
import { Course } from '../entities/courses.entity';
import { NotFoundException } from '@nestjs/common';

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

    it('should throw NotFoundException if course does not exist', () => {
      expect(() => service.findCourseById(999)).toThrow(NotFoundException);
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

    it('should throw NotFoundException if the course does not exist', () => {
      expect(() => service.findCourseById(999)).toThrow(NotFoundException); //TODO: por algum motivo a cobertura de testes não está cobrindo essa linha
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', () => {
      service.deleteCourse(1);
      expect(() => service.findCourseById(1)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if course does not exist', () => {
      expect(() => service.deleteCourse(999)).toThrow(NotFoundException);
      const courses = service.findAllCourses();
      expect(courses.length).toEqual(4); // Initial 4 courses remain
    });
  });
});
