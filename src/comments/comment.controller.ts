import { Controller, Get, Post, Body, Query, Put, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from "./create-comment.dto";

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 25,
    ): Promise<Comment[]> {
        return await this.commentService.findAll(page, limit);
    }

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.commentService.create(createCommentDto);
    }

    @Put()
    async update(@Query('id') id: number, @Body() commentData: Partial<Comment>): Promise<Comment> {
        return await this.commentService.update(id, commentData);
    }
}
