import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sign } from "./sign.entity"
import { CreateSignDto } from './dto/sign.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class SignsService {
    constructor(
        @InjectRepository(Sign)
        private readonly signRepository: Repository<Sign>
    ){}

    async find(userId: number): Promise<Sign[]> {
        return await this.signRepository.find({
            where: [
                { user: userId }
            ]
        });
    }

    async create(userId: number, createSignDto: CreateSignDto) {
        const url = createSignDto.url;
        const sign = new Sign()
        sign.user = await User.findOne(userId);
        sign.url = url;
        return await this.signRepository.save(sign);
    }
}
