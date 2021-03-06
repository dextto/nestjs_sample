import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { setupAdminPanel } from './user/infra/adapter/admin-bro/admin-panel.plugin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: false,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Housing')
    .setDescription('Housing application description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /** Setup Admin panel */
  await setupAdminPanel(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
