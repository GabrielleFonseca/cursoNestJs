import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';

describe('CoursesController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a course', () => {
    const courseData = {
      name: 'New Course',
      description: 'Course Description',
    };
    expect(controller.createCourse(courseData)).toEqual(courseData);
  });

  it('should find all courses', () => {
    expect(controller.findAllCourses()).toBe('All courses');
  });

  it('should find one course by id', () => {
    const courseId = '1';
    expect(controller.findOneCourse(courseId)).toBe(
      `Course with ID ${courseId}`,
    );
  });

  it('should update a course', () => {
    const courseId = '1';
    const updateData = {
      name: 'Updated Course',
      description: 'Updated Description',
    };
    expect(controller.updateCourse(courseId, updateData)).toEqual(updateData);
  });

  it('should delete a course', () => {
    const courseId = '1';
    expect(controller.deleteCourse(courseId)).toBe(
      `Course with ID ${courseId} deleted`,
    );
  });
});
