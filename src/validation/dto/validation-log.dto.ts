import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class ValidationLogDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    public rawDataId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    public sourceId: string;

    @IsNotEmpty()
    @IsString()
    public errors: string;
}