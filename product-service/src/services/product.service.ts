import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductDTO } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProduct(productDto: ProductDTO) {
    const product = this.productRepository.create(productDto);
    return this.productRepository.save(product);
  }

  async getAllProducts() {
    return this.productRepository.find();
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {productId: productId }, // Use "findOne" with options
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProduct(productId: string, productDto: ProductDTO) {
    const product = await this.getProduct(productId);
    Object.assign(product, productDto);
    return this.productRepository.save(product);
  }

  async deleteProduct(productId: string) {
    const product = await this.getProduct(productId);
    return this.productRepository.remove(product);
  }
}
