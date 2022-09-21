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
import { BrandService } from './../services/brand.service';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.findOne(id);
  }
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    return this.brandService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() payload: UpdateBrandDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.brandService.update(id, payload);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  remove(@Param(':id', ParseIntPipe) id: number) {
    return this.brandService.remove(id);
  }
}
