import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CommentController} from "./comments/comment.controller";
import {Comment} from "./entities/comment.entity";
import {CommentService} from "./comments/comment.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      entities: ["dist/**/*.entity.js"],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [AppController, CommentController],
  providers: [AppService, CommentService],
})
export class AppModule {}
