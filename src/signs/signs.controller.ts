import { Controller, Get, Param, Post, Body, Delete, HttpCode } from '@nestjs/common';
import { SignsService } from './signs.service';
import { CreateSignDto } from './dto/sign.dto';

@Controller('signs')
export class SignsController {
    constructor(private readonly signsService: SignsService) { }

    @Get('/user_id/:userId')
    async find(@Param('userId') userId: number) {
        return this.signsService.find(userId);
    }

    // TODO: apply ExceptionFiter
    @Post('/user_id/:userId')
    @HttpCode(201)
    async create(
        @Param('userId') userId: number,
        @Body() createSignDto: CreateSignDto
    ) {
        return this.signsService.create(userId, createSignDto);
    }

    @Delete(':signId')
    async delete(
        @Param('signId') signId: number,
    ) {
        return this.signsService.delete(signId);
    }
}
