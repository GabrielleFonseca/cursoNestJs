import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, dataSourceOptions } from '../database.module'; // Verifique se o caminho está correto

describe('DatabaseModule', () => {
  let databaseModule: DatabaseModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return {
              ...dataSourceOptions,
            };
          },
        }),
      ],
    }).compile();

    databaseModule = module.get<DatabaseModule>(DatabaseModule);
  });

  it('should be defined', () => {
    expect(databaseModule).toBeDefined();
  });
});
