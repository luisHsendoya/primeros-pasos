import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './controllers/product.controller';
import { CategoryController } from './controllers/category.controller';
import { UserModule } from './controllers/user/user.module';
import { ProductService } from './services/product.service';
import { BrandController } from './controllers/brand.controller';
import { UsuarioController } from './controllers/usuario.controller';
import { CustomerController } from './controllers/customer.controller';
import { UsuarioService } from './services/usuario.service';
import { BrandService } from './services/brand.service';
import { CustomerService } from './services/customer.service';
import { CategoryService } from './services/category.service';
@Module({
  imports: [UserModule],
  controllers: [
    AppController,
    ProductController,
    CategoryController,
    BrandController,
    UsuarioController,
    CustomerController,
  ],
  providers: [
    AppService,
    ProductService,
    UsuarioService,
    BrandService,
    CustomerService,
    CategoryService,
  ],
})
export class AppModule {}
