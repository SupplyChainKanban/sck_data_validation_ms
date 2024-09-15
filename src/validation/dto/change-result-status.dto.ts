import { ValidationStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { priorityList, validationStatusList } from "../enums/data.enum";

export class ChangeResultStatusDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    public id: string;

    @IsEnum(validationStatusList, {
        message: `Possible status are ${priorityList}`
    })
    public status: ValidationStatus;
}