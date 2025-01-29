import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  private productServiceUrl = 'http://product-service:3002/products';

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly httpService: HttpService,
  ) {}

  async createOrder(orderDto: Partial<Order>) {
    if (!orderDto.productId) {
      throw new Error('Product ID is required');
    }
    const productDetails = await this.getProductDetails(orderDto.productId);
    
   // const productDetails = await this.getProductDetails(orderDto.productId);
    if (!productDetails) {
      throw new NotFoundException('Product not found');
    }
    const order = this.orderRepository.create(orderDto);
    return this.orderRepository.save(order);
  }

  async getAllOrders() {
    const orders = await this.orderRepository.find();
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => ({
        ...order,
        productDetails: await this.getProductDetails(order.productId),
      })),
    );
    return ordersWithDetails;
  }

  async getOrderById(orderId: string): Promise<Order & { productDetails: any }> {
    const order = await this.orderRepository.findOne({ where: { orderId: orderId } });
  
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
  
    const productDetails = await this.getProductDetails(order.productId);
  
    return { ...order, productDetails };
  }

  private async getProductDetails(productId: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.productServiceUrl}/${productId}`),
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching product details:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
    
  }
}
