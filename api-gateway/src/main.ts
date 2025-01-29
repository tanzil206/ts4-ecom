import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProxyModule } from './proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProxyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
