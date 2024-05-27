import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Post()
  createCourse(@Body() body: any) {
    return body;
  }

  @Get()
  findAllCourses() {
    return 'All courses';
  }

  @Get(':id')
  findOneCourse(@Param('id') id: string) {
    return `Course with ID ${id}`;
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return `Course with ID ${id} deleted`;
  }
}
