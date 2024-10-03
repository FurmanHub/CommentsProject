import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import * as DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = (new JSDOM('')).window;
const purify = DOMPurify(window);

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    // Получение всех комментариев
    async findAll(page: number, limit: number): Promise<Comment[]> {
        const skip = (page - 1) * limit;
        return await this.commentRepository.find({
            order: { createdAt: 'DESC' },
            skip: skip,
            take: limit,
        });
    }

    private sanitizeAndValidateText(text: string): string {
        const allowedTags = ['a', 'code', 'i', 'strong'];
        const cleanText = purify.sanitize(text, {
            ALLOWED_TAGS: allowedTags,
            ALLOWED_ATTR: ['href', 'title'],
        });

        if (!cleanText || cleanText.trim() === '') {
            throw new BadRequestException('Text must not be empty or contain only invalid HTML.');
        }

        return cleanText;
    }

    async create(commentData: Partial<Comment>): Promise<Comment> {
        commentData.text = this.sanitizeAndValidateText(commentData.text);
        const newComment = this.commentRepository.create(commentData);
        return await this.commentRepository.save(newComment);
    }


    async update(id: number, commentData: Partial<Comment>): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({ id });

        if (!comment) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }

        commentData.text = this.sanitizeAndValidateText(commentData.text);

        comment.text = commentData.text;
        if (commentData.userName) comment.userName = commentData.userName;
        if (commentData.email) comment.email = commentData.email;
        if (commentData.homePage) comment.homePage = commentData.homePage;

        return await this.commentRepository.save(comment);
    }
}