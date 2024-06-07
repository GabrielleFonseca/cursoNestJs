import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [],
})
export class CoursesModule {}
