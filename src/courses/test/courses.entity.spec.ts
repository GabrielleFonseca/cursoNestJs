import { Course } from '../courses.entity';

describe('Course', () => {
  let course: Course;

  beforeEach(() => {
    course = new Course();
  });

  describe('Default properties', () => {
    it('should create an instance of Course', () => {
      expect(course).toBeInstanceOf(Course);
    });

    it('should have undefined properties by default', () => {
      expect(course.id).toBeUndefined();
      expect(course.name).toBeUndefined();
      expect(course.description).toBeUndefined();
      expect(course.tags).toBeUndefined();
    });
  });

  describe('Setting properties', () => {
    it('should allow setting id', () => {
      course.id = 1;
      expect(course.id).toBe(1);
    });

    it('should allow setting name', () => {
      course.name = 'Test Course';
      expect(course.name).toBe('Test Course');
    });

    it('should allow setting description', () => {
      course.description = 'This is a test course';
      expect(course.description).toBe('This is a test course');
    });

    it('should allow setting tags', () => {
      course.tags = ['test', 'course'];
      expect(course.tags).toEqual(['test', 'course']);
    });
  });
});
