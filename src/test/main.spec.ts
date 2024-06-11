import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

describe('Bootstrap', () => {
  let app: { useGlobalPipes: jest.Mock; listen: jest.Mock };

  beforeAll(() => {
    app = {
      useGlobalPipes: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
    };
    (NestFactory.create as jest.Mock).mockResolvedValue(app);
  });

  it('should create the app and configure the ValidationPipe', async () => {
    await import('../main');

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(app.useGlobalPipes).toHaveBeenCalledWith(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    expect(app.listen).toHaveBeenCalledWith(3000);
  });
});
