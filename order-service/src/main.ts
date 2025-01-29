import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Eureka } from 'nestjs-eureka';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const eureka = new Eureka({
    instance: {
      app: 'order-service', // Change for each service
      instanceId: `order-service-${Math.random()}`,
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: { $: 3003, '@enabled': true },
      vipAddress: 'order-service',
      statusPageUrl: 'http://localhost:3003/info',
      healthCheckUrl: 'http://localhost:3003/health',
      homePageUrl: 'http://localhost:3003',
    },
    eureka: {
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/',
    },
  });

  eureka.start();

  await app.listen(3003);
}
bootstrap();
