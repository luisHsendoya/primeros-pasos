import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParseIntPipe } from '../common/parse-int.pipe';
//import { Response } from 'express';
import { ProductService } from './../services/product.service';
import { CreateProductoDto, UpdateProductoDto } from './../dtos/products.dto';

//obtener mi response y mi request con express y los decorades de nest
@Controller('product')
export class ProductController {
  //el motor de nest va resolver esta inyección de dependencias y se la va a pasar al controlador
  constructor(private productService: ProductService) {}
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    // return {
    //   message: `product ${productId}`,
    // };
    return this.productService.findOne(productId);
  }

  @Get()
  getAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    //`${limit} ${offset} ${brand}`;
    return this.productService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductoDto) {
    // return {
    //   message: 'created',
    //   payload,
    // };
    return this.productService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductoDto) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    // return {
    //   id,
    //   message: 'delete correctly',
    // };

    return this.productService.remove(+id);
  }
}
