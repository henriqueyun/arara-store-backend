import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: typeof Address,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    return await this.addressRepository.create({ ...createAddressDto });
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.findAll<Address>();
  }

  async findAddressesByUser(userId: number): Promise<Address[]> {
    return await this.addressRepository.findAll<Address>({
      where: {
        userId,
      },
    });
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<[affectedCount: number]> {
    return await this.addressRepository.update(updateAddressDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<number> {
    return await this.addressRepository.destroy({
      where: {
        id,
      },
    });
  }
}
