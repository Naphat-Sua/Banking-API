import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class FileUploadOutput {
    @ApiProperty()
    @IsString()
    filename: string;

    @ApiProperty()
    @IsString()
    url: string;
}
