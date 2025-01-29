import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDTO } from '../dto/product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('products')
  async addProduct(@Body() productDto: ProductDTO) {
    return this.productService.addProduct(productDto);
  }

  @Get('products')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('products/:id')
  async getProduct(@Param('id') productId: string) {
    return this.productService.getProduct(productId);
  }

  @Put('products/:id')
  async updateProduct(@Param('id') productId: string, @Body() productDto: ProductDTO) {
    return this.productService.updateProduct(productId, productDto);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
