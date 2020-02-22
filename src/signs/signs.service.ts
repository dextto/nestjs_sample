import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sign } from "./sign.entity"

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
}
