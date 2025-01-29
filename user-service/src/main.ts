import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Eureka } from 'nestjs-eureka';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const eureka = new Eureka({
    instance: {
      app: 'user-service', // Change for each service
      instanceId: `user-service-${Math.random()}`,
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: { $: 3001, '@enabled': true },
      vipAddress: 'user-service',
      statusPageUrl: 'http://localhost:3001/info',
      healthCheckUrl: 'http://localhost:3001/health',
      homePageUrl: 'http://localhost:3001',
    },
    eureka: {
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/',
    },
  });

  eureka.start();

  await app.listen(3001);
}
bootstrap();
