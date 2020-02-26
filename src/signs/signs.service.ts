import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sign } from "./sign.entity"
import { CreateSignDto } from './dto/sign.dto';
import { User } from '../users/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class SignsService {
    constructor(
        @InjectRepository(Sign)
        private readonly signRepository: Repository<Sign>
    ) { }

    async find(userId: number): Promise<Sign[]> {
        return await Sign.find({ userId: userId });
    }

    async create(userId: number, createSignDto: CreateSignDto) {
        const url = createSignDto.url;
        const sign = new Sign()
        sign.user = await User.findOne(userId);
        sign.url = url;

        const errors = await validate(sign);
        console.log(errors);
        if (errors.length > 0) {
            const errors = { username: 'Userinput is not valid.' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
        } else {
            return await Sign.save(sign);
        }
    }

    async delete(signId: number) {
        const sign = await Sign.findOne(signId);

        if (!sign) {
            const errors = { username: 'Userinput is not valid.' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
        } else {
            return Sign.delete(sign);
        }
    }
}
