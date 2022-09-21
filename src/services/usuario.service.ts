import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Usuario } from './../entities/usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from './../dtos/usuario.dto';

@Injectable()
export class UsuarioService {
  private counterId = 1;
  private usuarios: Usuario[] = [];

  findAll() {
    return this.usuarios;
  }
  findOne(id: number) {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (index === -1)
      throw new HttpException(
        `the id #${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    return this.usuarios[index];
  }
  create(payload: CreateUsuarioDto) {
    this.counterId += 1;
    const newUsuario = {
      id: this.counterId,
      ...payload,
    };
    this.usuarios = [...this.usuarios, newUsuario];
    return newUsuario;
  }
  update(payload: UpdateUsuarioDto, id: number) {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (index === -1)
      throw new HttpException(
        `the id #${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    this.usuarios[index] = { ...payload, ...this.usuarios[index] };
    return this.usuarios[index];
  }
  remove(id: number) {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (index === -1)
      throw new HttpException(
        `the id #${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    this.usuarios.splice(index, 1);
    return {
      message: `the id #${id} was deleted`,
    };
  }
}
