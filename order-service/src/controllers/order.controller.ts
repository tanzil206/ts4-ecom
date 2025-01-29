import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderDTO } from '../dto/order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('orders')
  async createOrder(@Body() orderDto: OrderDTO) {
    return this.orderService.createOrder(orderDto);
  }

  @Get('orders')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('orders/:id')
  async getOrderById(@Param('id') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }
}
