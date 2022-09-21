import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Brand } from './../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brand.dto';

@Injectable()
export class BrandService {
  private counterId = 1;
  private brands: Brand[] = [];

  findAll() {
    return this.brands;
  }
  findOne(id: number) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand)
      throw new HttpException(
        'the #id brand not found',
        HttpStatus.BAD_REQUEST,
      );

    return brand;
  }
  create(payload: CreateBrandDto) {
    this.counterId += 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };

    this.brands = [...this.brands, newBrand];
    return newBrand;
  }
  update(id: number, payload: UpdateBrandDto) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1)
      throw new HttpException(
        `the id #${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    this.brands[index] = { id, ...this.brands[index], ...payload };
    return this.brands[index];
  }

  remove(id: number) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1)
      throw new HttpException(
        `the id #${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    this.brands.splice(index, 1);

    return {
      message: `the brand #${id} was deleted`,
    };
  }
}
