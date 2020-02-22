import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { SignsService } from './signs.service';
import { CreateSignDto } from './dto/sign.dto';

@Controller('signs')
export class SignsController {
    constructor(private readonly signsService: SignsService) {}

    @Get(':userId')
    find(@Param('userId') userId: number) {
        return this.signsService.find(userId);
    }

    @Post(':userId')
    async create(
        @Param('userId') userId: number,
        @Body() createSignDto: CreateSignDto
    ) {
        console.log(userId);
        console.log(createSignDto.url);
        this.signsService.create(userId, createSignDto);
    }
}
