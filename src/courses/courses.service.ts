import { CreateCourseDTO } from './dto/create-curse.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';
import { UpdateCourseDTO } from './dto/update-courses.dto';

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

  // createCourse(createCourseDTO: CreateCourseDTO) {
  //   this.courses.push(createCourseDTO);
  //   return createCourseDTO;
  // }

  createCourse(createCourseDTO: CreateCourseDTO) {
    const newCourse: Course = {
      id: this.courses.length + 1, // Generate a new id
      ...createCourseDTO,
    };
    this.courses.push(newCourse);
    return newCourse;
  } // gerado por GPT para resolver erro por enquanto

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

  // updateCourse(id: number, updateCourseDTO: UpdateCourseDTO) {
  //   const existingCourse = this.findCourseById(id);
  //   if (existingCourse as any) {
  //     const courseIndex = this.courses.findIndex((course) => course.id === id);
  //     this.courses[courseIndex] = {
  //       id,
  //       ...updateCourseDTO,
  //     };
  //     return this.courses[courseIndex];
  //   } else {
  //     throw new NotFoundException(`Course ${id} not found`);
  //   }
  // }

  updateCourse(id: number, updateCourseDTO: UpdateCourseDTO) {
    const existingCourse = this.findCourseById(id);
    if (existingCourse) {
      const courseIndex = this.courses.findIndex((course) => course.id === id);
      const updatedCourse: Course = {
        ...existingCourse,
        ...updateCourseDTO,
      };
      this.courses[courseIndex] = updatedCourse;
      return updatedCourse;
    } else {
      throw new NotFoundException(`Course ${id} not found`);
    }
  } // gerado por GPT para resolver erro por enquanto

  deleteCourse(id: number) {
    const courseIndex = this.courses.findIndex((course) => course.id === id);
    if (courseIndex >= 0) {
      this.courses.splice(courseIndex, 1);
    } else {
      throw new NotFoundException(`Course ${id} not found`);
    }
  }
}
