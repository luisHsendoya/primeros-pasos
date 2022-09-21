import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from './../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './../dtos/customer.dto';

@Injectable()
export class CustomerService {
  private counterId = 1;
  private customers: Customer[] = [];

  findAll() {
    return this.customers;
  }
  findOne(id: number) {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1)
      throw new HttpException(
        `the id #${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    return this.customers[index];
  }
  create(payload: CreateCustomerDto) {
    this.counterId += 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };

    this.customers = [...this.customers, newCustomer];
    return newCustomer;
  }
  update(payload: UpdateCustomerDto, id: number) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex((custom) => custom.id === id);
    this.customers[index] = { ...customer, ...payload };
    return customer;
  }
  remove(id: number) {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1)
      throw new HttpException(
        `the id #${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    this.customers.splice(index, 1);
    return {
      message: `the id #${id} was deleted`,
    };
  }
}
