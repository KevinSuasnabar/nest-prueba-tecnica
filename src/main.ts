import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //para logear a que endpoint al cual le estoy pegando
  app.use(morgan('dev'))

  //para poder manejar dtos con classs-validator
  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  //para uso de class-transformer
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  const configService = app.get(ConfigService);

  app.enableCors(CORS)


  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Tipo de cambio API')
    .setDescription('Aplicacion realizar cambios de divisas')
    .setVersion('1.0')
    .setBasePath('api')
    //.addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  await app.listen(3000);
  console.log('Application running on: ' + configService.get('PORT'))

  console.log('Application running on: ' + await app.getUrl())

}
bootstrap();
