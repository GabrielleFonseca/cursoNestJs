import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from '../courses.service';
import { Course } from '../entities/courses.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


//TODO: está dando erro

describe('CoursesService', () => {
  let service: CoursesService;
  let repository: Repository<Course>;

  const mockCourseRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockCourseRepository,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    repository = module.get<Repository<Course>>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createCourse', () => {
    it('should create a course', async () => {
      const newCourse: Course = {
        id: 5,
        name: 'Vue',
        description: 'Vue course',
        tags: ['vue', 'frontend', 'javascript', 'html', 'css'],
      };

      mockCourseRepository.create.mockReturnValue(newCourse);
      mockCourseRepository.save.mockResolvedValue(newCourse);

      expect(await service.createCourse(newCourse)).toEqual(newCourse);
      expect(mockCourseRepository.create).toHaveBeenCalledWith(newCourse);
      expect(mockCourseRepository.save).toHaveBeenCalledWith(newCourse);
    });
  });

  describe('findAllCourses', () => {
    it('should return all courses', async () => {
      const courses = [{ name: 'Course 1' }, { name: 'Course 2' }];

      mockCourseRepository.find.mockResolvedValue(courses);

      expect(await service.findAllCourses()).toEqual(courses);
      expect(mockCourseRepository.find).toHaveBeenCalled();
    });
  });

  describe('findCourseById', () => {
    it('should return a course by ID', async () => {
      const course = { id: 1, name: 'Course 1' };

      mockCourseRepository.findOne.mockResolvedValue(course);

      expect(await service.findCourseById(1)).toEqual(course);
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if course does not exist', async () => {
      mockCourseRepository.findOne.mockResolvedValue(null);

      await expect(service.findCourseById(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('updateCourse', () => {
    it('should update a course', async () => {
      const updatedCourse = {
        id: 1,
        name: 'Updated NestJS',
        description: 'Updated NestJS course',
      };
      mockCourseRepository.preload.mockResolvedValue(updatedCourse);
      mockCourseRepository.save.mockResolvedValue(updatedCourse);

      expect(await service.updateCourse(1, updatedCourse)).toEqual(
        updatedCourse,
      );
      expect(mockCourseRepository.preload).toHaveBeenCalledWith({
        ...updatedCourse,
        id: 1,
      });
      expect(mockCourseRepository.save).toHaveBeenCalledWith(updatedCourse);
    });

    it('should throw NotFoundException if the course does not exist', async () => {
      mockCourseRepository.preload.mockResolvedValue(null);

      await expect(service.updateCourse(999, {})).rejects.toThrow(
        NotFoundException,
      );
      expect(mockCourseRepository.preload).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', async () => {
      const course = { id: 1, name: 'Course 1' };
      mockCourseRepository.findOne.mockResolvedValue(course);
      mockCourseRepository.remove.mockResolvedValue(course);

      expect(await service.deleteCourse(1)).toEqual(course);
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockCourseRepository.remove).toHaveBeenCalledWith(course);
    });

    it('should throw NotFoundException if course does not exist', async () => {
      mockCourseRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteCourse(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });
});
