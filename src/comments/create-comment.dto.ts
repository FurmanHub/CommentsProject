import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    homePage?: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    text: string;
}
