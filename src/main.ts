import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Blog API with NestJs & MongoDB')
    .setDescription('Project for CodigoFacilito')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
