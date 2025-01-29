import { Injectable, HttpService } from '@nestjs/common';
import { Eureka } from 'nestjs-eureka';

@Injectable()
export class ProxyService {
  private eureka: Eureka;

  constructor(private readonly httpService: HttpService) {
    this.eureka = new Eureka({
      instance: {
        app: 'api-gateway',
        instanceId: `api-gateway-${Math.random()}`,
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: { $: 3000, '@enabled': true },
        vipAddress: 'api-gateway',
        statusPageUrl: 'http://localhost:3000/info',
        healthCheckUrl: 'http://localhost:3000/health',
        homePageUrl: 'http://localhost:3000',
      },
      eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
      },
    });

    this.eureka.start();
  }

  async forwardRequest(serviceName: string, endpoint: string, method = 'GET', data?: any) {
    const serviceInstances = this.eureka.getInstancesByAppId(serviceName.toUpperCase());
    
    if (!serviceInstances.length) {
      throw new Error(`Service ${serviceName} not found`);
    }

    const serviceUrl = serviceInstances[0].homePageUrl + endpoint;

    const response = await this.httpService.axiosRef.request({
      method,
      url: serviceUrl,
      data,
    });

    return response.data;
  }
}
