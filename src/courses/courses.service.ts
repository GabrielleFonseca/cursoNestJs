import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-curse.dto';
import { UpdateCourseDTO } from './dto/update-courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async createCourse(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );
    const course = this.coursesRepository.create({
      ...createCourseDTO,
      tags: tags,
    });
    return this.coursesRepository.save(course);
  }

  async findAllCourses() {
    return this.coursesRepository.find({
      relations: ['tags'],
    });
  }

  async findCourseById(id: number) {
    const course = await this.coursesRepository.findOne({
      where: { id: id },
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return course;
  }

  async updateCourse(id: number, updateCourseDTO: UpdateCourseDTO) {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name)),
      ));
    const course = await this.coursesRepository.preload({
      ...updateCourseDTO,
      id: id,
      tags: tags,
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return this.coursesRepository.save(course);
  }

  async deleteCourse(id: number) {
    const course = await this.coursesRepository.findOne({
      where: { id: id },
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return this.coursesRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ where: { name: name } });

    if (tag) {
      return tag;
    }

    return this.tagsRepository.create({ name });
  }
}
