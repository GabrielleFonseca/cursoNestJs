import { Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

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

  createCourse(createdCourse: Course) {
    this.courses.push(createdCourse);
    return createdCourse;
  }

  findAllCourses() {
    return this.courses;
  }

  findCourseById(id: number) {
    return this.courses.find((course) => course.id === id);
  }

  updateCourse(id: number, updatedCourse: Course) {
    const existingCourse = this.findCourseById(id);
    if (existingCourse) {
      const courseIndex = this.courses.findIndex((course) => course.id === id);
      this.courses[courseIndex] = {
        id,
        ...updatedCourse,
      };
      return this.courses[courseIndex];
    }
  }

  deleteCourse(id: number) {
    const courseIndex = this.courses.findIndex((course) => course.id === id);
    if (courseIndex >= 0) {
      this.courses.splice(courseIndex, 1);
    }
  }
}
