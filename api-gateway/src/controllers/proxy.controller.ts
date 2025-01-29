import { Controller, Get, Post, Body, Param, Req, Res } from '@nestjs/common';
import { ProxyService } from '../services/proxy.service';
import { Request, Response } from 'express';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('auth/register')
  async register(@Body() body, @Res() res: Response) {
    const response = await this.proxyService.forwardRequest('http://user-service:3001/register', body);
    return res.status(response.status).json(response.data);
  }

  @Post('auth/login')
  async login(@Body() body, @Res() res: Response) {
    const response = await this.proxyService.forwardRequest('http://user-service:3001/login', body);
    return res.status(response.status).json(response.data);
  }

  @Get('products')
  async getProducts(@Res() res: Response) {
    const response = await this.proxyService.forwardRequest('http://product-service:3002/products');
    return res.status(response.status).json(response.data);
  }

  @Get('orders')
  async getOrders(@Res() res: Response) {
    const response = await this.proxyService.forwardRequest('http://order-service:3003/orders');
    return res.status(response.status).json(response.data);
  }
}
