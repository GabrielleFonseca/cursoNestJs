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
import { CreateCourseDTO } from './dto/create-curse.dto';
import { UpdateCourseDTO } from './dto/update-courses.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  createCourse(@Body() createCourseDTO: CreateCourseDTO) {
    return this.coursesService.createCourse(createCourseDTO);
  }

  @Get()
  findAllCourses() {
    return this.coursesService.findAllCourses();
  }

  @Get(':id')
  findOneCourse(@Param('id') id: number) {
    return this.coursesService.findCourseById(id);
  }

  @Put(':id')
  updateCourse(
    @Param('id') id: number,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ) {
    return this.coursesService.updateCourse(id, updateCourseDTO);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: number) {
    return this.coursesService.deleteCourse(id);
  }
}
