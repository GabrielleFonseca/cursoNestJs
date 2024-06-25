import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  createCourse(createCourseDTO: any) {
    const course = this.coursesRepository.create(createCourseDTO);
    return this.coursesRepository.save(course);
  }

  async findAllCourses() {
    return this.coursesRepository.find();
  }

  async findCourseById(id: number) {
    const course = await this.coursesRepository.findOne({
      where: { id: id },
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return course;
  }

  async updateCourse(id: number, updateCourseDTO: any) {
    const course = await this.coursesRepository.preload({
      ...updateCourseDTO,
      id: id,
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
}
