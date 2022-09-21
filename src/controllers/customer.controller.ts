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
  ParseIntPipe,
} from '@nestjs/common';
import { CustomerService } from './../services/customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './../dtos/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    return this.customerService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() payload: UpdateCustomerDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.customerService.update(payload, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }
}
