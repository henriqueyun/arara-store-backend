import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrecoPrazoResponse, calcularPrecoPrazo } from 'correios-brasil';
import { Op } from 'sequelize';
import { Item, Product, Cart, Image } from '../index.entities';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CARTS_REPOSITORY')
    private cartRepository: typeof Cart,
  ) {}
  async create(createCartDto: CreateCartDto) {
    return await this.cartRepository.create({ ...createCartDto });
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.findAll<Cart>();
  }

  async findOne(userId: number): Promise<Cart> {
    return await this.cartRepository.findOne<Cart>({
      include: [
        {
          model: Item,
          include: [
            {
              model: Product,
              include: [
                {
                  model: Image,
                },
              ],
            },
          ],
        },
      ],
      where: {
        [Op.and]: [{ userId }, { soldOut: false }],
      },
    });
  }

  async update(
    id: number,
    updateCartDto: UpdateCartDto,
  ): Promise<[affectedCount: number]> {
    return await this.cartRepository.update(updateCartDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<number> {
    return await this.cartRepository.destroy({
      where: {
        id,
      },
    });
  }

  async shipping({ cep }: { cep: string }): Promise<PrecoPrazoResponse[]> {
    if (cep.length !== 8) {
      throw new HttpException(
        'ZIP CODE MUST BE EXACTLY 8 DIGITS',
        HttpStatus.BAD_REQUEST,
      );
    }

    const args = {
      sCepOrigem: '03694000',
      sCepDestino: `${cep}`,
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '35',
      nVlAltura: '2',
      nVlLargura: '25',
      nCdServico: ['04014 ', '04510'], // Array com os códigos de serviço atualmente pac e sedex
      nVlDiametro: '0',
    };

    const response = [
      {
        Codigo: '',
        Valor: '50',
        PrazoEntrega: '30',
        ValorSemAdicionais: '',
        ValorMaoPropria: '',
        ValorAvisoRecebimento: '',
        ValorDeclarado: '',
        EntregaDomiciliar: '',
        EntregaSabado: '',
        obsFim: '',
        Erro: '',
        MsgErro: '',
      },
    ];

    const p = new Promise<PrecoPrazoResponse[]>((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 10000);

      calcularPrecoPrazo(args)
        .then((data) => resolve(data))
        .catch((_) => resolve(response));
    });

    return await p;
  }
}
