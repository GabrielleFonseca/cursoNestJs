import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from '../courses.service';
import { Course } from '../entities/courses.entity';
import { Tag } from '../entities/tags.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: Repository<Course>;
  let tagRepository: Repository<Tag>;

  const mockCourseRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  const mockTagRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockCourseRepository,
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagRepository,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<Repository<Course>>(
      getRepositoryToken(Course),
    );
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(courseRepository).toBeDefined();
    expect(tagRepository).toBeDefined();
  });

  describe('createCourse', () => {
    it('should create a course', async () => {
      const newCourse = {
        id: 5,
        name: 'Vue',
        description: 'Vue course',
        tags: ['vue', 'frontend', 'javascript', 'html', 'css'],
      };

      const tags = [
        { name: 'vue' },
        { name: 'frontend' },
        { name: 'javascript' },
        { name: 'html' },
        { name: 'css' },
      ];
      tags.forEach((tag) =>
        mockTagRepository.findOne.mockResolvedValueOnce(tag),
      );
      tags.forEach((tag) => mockTagRepository.create.mockReturnValue(tag));

      mockCourseRepository.create.mockReturnValue(newCourse);
      mockCourseRepository.save.mockResolvedValue(newCourse);

      expect(await service.createCourse(newCourse)).toEqual(newCourse);
      expect(mockCourseRepository.create).toHaveBeenCalledWith({
        ...newCourse,
        tags,
      });
      expect(mockCourseRepository.save).toHaveBeenCalledWith(newCourse);
    });
  });

  describe('findAllCourses', () => {
    it('should return all courses', async () => {
      const courses = [
        { name: 'Course 1', tags: [] },
        { name: 'Course 2', tags: [] },
      ];
      mockCourseRepository.find.mockResolvedValue(courses);

      expect(await service.findAllCourses()).toEqual(courses);
      expect(mockCourseRepository.find).toHaveBeenCalledWith({
        relations: ['tags'],
      });
    });
  });

  describe('findCourseById', () => {
    it('should return a course by ID', async () => {
      const course = { id: 1, name: 'Course 1', tags: [] };
      mockCourseRepository.findOne.mockResolvedValue(course);

      expect(await service.findCourseById(1)).toEqual(course);
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['tags'],
      });
    });

    it('should throw NotFoundException if course does not exist', async () => {
      mockCourseRepository.findOne.mockResolvedValue(null);

      await expect(service.findCourseById(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['tags'],
      });
    });
  });

  describe('updateCourse', () => {
    it('should update a course', async () => {
      const updatedCourse = {
        id: 1,
        name: 'Updated NestJS',
        description: 'Updated NestJS course',
        tags: ['nestjs', 'backend'],
      };

      const tags = [{ name: 'nestjs' }, { name: 'backend' }];
      tags.forEach((tag) =>
        mockTagRepository.findOne.mockResolvedValueOnce(tag),
      );
      tags.forEach((tag) => mockTagRepository.create.mockReturnValue(tag));

      mockCourseRepository.preload.mockResolvedValue(updatedCourse);
      mockCourseRepository.save.mockResolvedValue(updatedCourse);

      expect(await service.updateCourse(1, updatedCourse)).toEqual(
        updatedCourse,
      );
      expect(mockCourseRepository.preload).toHaveBeenCalledWith({
        ...updatedCourse,
        id: 1,
        tags,
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
      const course = { id: 1, name: 'Course 1', tags: [] };
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

  describe('preloadTagByName', () => {
    it('should return an existing tag if found', async () => {
      const tag = { id: 1, name: 'nestjs' };
      mockTagRepository.findOne.mockResolvedValue(tag);

      const result = await service['preloadTagByName']('nestjs');
      console.log('Existing Tag Result:', result);

      expect(result).toEqual(tag);
      expect(mockTagRepository.findOne).toHaveBeenCalledWith({
        where: { name: 'nestjs' },
      });
    });

    it('should create a new tag if not found', async () => {
      const newTagName = 'angular';
      const newTag = { id: 2, name: newTagName };

      mockTagRepository.findOne.mockResolvedValue(null);
      mockTagRepository.create.mockReturnValue(newTag);

      const result = await service['preloadTagByName'](newTagName);

      expect(mockTagRepository.findOne).toHaveBeenCalledWith({
        where: { name: newTagName },
      });
      expect(mockTagRepository.create).toHaveBeenCalledWith({
        name: newTagName,
      });
      expect(result).toEqual(newTag);
    });
  });
});
