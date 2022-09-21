import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Category } from './../entities/category.entity';
import { CreateCategoryDto, UpdateCategory } from './../dtos/category.dto';

@Injectable()
export class CategoryService {
  private counterId = 1;
  private category: Category[] = [];

  findAll() {
    return this.category;
  }
  findOne(id: number) {
    const index = this.category.findIndex((category) => category.id === id);

    if (index === -1)
      throw new HttpException(
        `the id #${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    return this.category[index];
  }
  create(payload: CreateCategoryDto) {
    this.counterId += 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };

    this.category = [...this.category, newCategory];

    return newCategory;
  }
  update(payload: UpdateCategory, id: number) {
    const category = this.findOne(id);
    const index = this.category.findIndex((categor) => categor.id === id);

    this.category[index] = { ...payload, ...category[index] };

    return this.category[index];
  }
  remove(id: number) {
    const index = this.category.findIndex((category) => category.id === id);
    if (index === -1)
      throw new HttpException(
        `the id # ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    this.category.splice(index, 1);
    return {
      message: `the category #${id} was deleted`,
    };
  }
}
