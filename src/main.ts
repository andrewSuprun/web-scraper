import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Web scraper API')
    .setDescription('Web scraper API documentation')
    .setVersion('1.0.0')
    .addTag('Andrii Suprun')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/scraper/docs', app, document);
  await app.listen(PORT);
  console.log(PORT)
}
bootstrap();
