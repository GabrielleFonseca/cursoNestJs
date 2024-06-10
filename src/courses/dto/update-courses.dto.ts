import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDTO } from './create-curse.dto';

export class UpdateCourseDTO extends PartialType(
  CreateCourseDTO,
) {} /*PartialType é um helper que cria um DTO com todos os campos opcionais 
        e, nesse caso, está utilizando o CreateCourseDTO como base*/
