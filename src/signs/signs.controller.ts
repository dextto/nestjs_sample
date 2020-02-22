import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { SignsService } from './signs.service';
import { CreateSignDto } from './dto/sign.dto';

@Controller('signs')
export class SignsController {
    constructor(private readonly signsService: SignsService) {}

    @Get(':userId')
    async find(@Param('userId') userId: number) {
        return this.signsService.find(userId);
    }

    @Post(':userId')
    async create(
        @Param('userId') userId: number,
        @Body() createSignDto: CreateSignDto
    ) {
        this.signsService.create(userId, createSignDto);
    }

    @Delete(':signId')
    async delete(
        @Param('signId') signId: number,
    ) {
        this.signsService.delete(signId);
    }
}
