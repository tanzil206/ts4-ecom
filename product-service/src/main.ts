import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Eureka } from 'nestjs-eureka';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const eureka = new Eureka({
    instance: {
      app: 'product-service', // Change for each service
      instanceId: `product-service-${Math.random()}`,
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: { $: 3002, '@enabled': true },
      vipAddress: 'product-service',
      statusPageUrl: 'http://localhost:3002/info',
      healthCheckUrl: 'http://localhost:3002/health',
      homePageUrl: 'http://localhost:3002',
    },
    eureka: {
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/',
    },
  });

  eureka.start();

  await app.listen(3002);
}
bootstrap();
