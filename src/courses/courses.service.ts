import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'NestJS course',
      tags: ['nestjs', 'nodejs', 'typescript', 'backend', 'javascript'],
    },
    {
      id: 2,
      name: 'Angular',
      description: 'Angular course',
      tags: ['angular', 'typescript', 'frontend', 'javascript', 'html'],
    },
    {
      id: 3,
      name: 'MongoDB',
      description: 'MongoDB course',
      tags: ['mongodb', 'database', 'nosql', 'backend', 'javascript'],
    },
    {
      id: 4,
      name: 'React',
      description: 'React course',
      tags: ['react', 'frontend', 'javascript', 'html', 'css'],
    },
  ];

  createCourse(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
    return createCourseDTO;
  }

  findAllCourses() {
    return this.courses;
  }

  findCourseById(id: number) {
    const course = this.courses.find((course) => course.id === id);

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return course;
  }

  updateCourse(id: number, updateCourseDTO: any) {
    const existingCourseIndex = this.courses.findIndex(
      (course) => course.id === id,
    );

    if (existingCourseIndex >= 0) {
      this.courses[existingCourseIndex] = {
        id,
        ...updateCourseDTO,
      };
      return this.courses[existingCourseIndex];
    } else {
      throw new NotFoundException(`Course ${id} not found`);
    }
  }

  deleteCourse(id: number) {
    const courseIndex = this.courses.findIndex((course) => course.id === id);
    if (courseIndex >= 0) {
      this.courses.splice(courseIndex, 1);
    } else {
      throw new NotFoundException(`Course ${id} not found`);
    }
  }
}
