import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  createCourse(@Body() body: any) {
    return this.coursesService.createCourse(body);
  }

  @Get()
  findAllCourses() {
    return this.coursesService.findAllCourses();
  }

  @Get(':id')
  findOneCourse(@Param('id') id: number) {
    return this.coursesService.findCourseById(+id);
  }

  @Put(':id')
  updateCourse(@Param('id') id: number, @Body() body: any) {
    return this.coursesService.updateCourse(+id, body);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: number) {
    return this.coursesService.deleteCourse(+id);
  }
}
