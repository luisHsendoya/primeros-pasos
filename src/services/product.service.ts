import { Injectable } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductoDto, UpdateProductoDto } from './../dtos/products.dto';

@Injectable()
export class ProductService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product1',
      description: 'bla bla bla',
      price: 2500,
      stock: 5,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product)
      throw new HttpException('id not found', HttpStatus.BAD_REQUEST);

    return this.products.find((product) => product.id === id);
  }
  create(payload: CreateProductoDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products = [...this.products, newProduct];

    return newProduct;
  }

  update(id: number, payload: UpdateProductoDto) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1)
      throw new HttpException('id not found', HttpStatus.BAD_REQUEST);
    this.products[index] = { id, ...payload, ...this.products[index] };
    return this.products[index];
  }

  remove(id: any) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1)
      throw new HttpException('id not found', HttpStatus.BAD_REQUEST);

    this.products.splice(index, 1);

    return {
      message: `product #${id} has been deleted succesfuly`,
    };
  }
}
