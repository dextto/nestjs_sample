import { Controller, Get, Param } from '@nestjs/common';
import { SignsService } from './signs.service';

@Controller('signs')
export class SignsController {
    constructor(private readonly signsService: SignsService) {}

    @Get(':userId')
    find(@Param('userId') userId: number) {
        return this.signsService.find(userId);
    }
}
