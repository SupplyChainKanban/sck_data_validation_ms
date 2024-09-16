import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { RawDataStatus, rawStatusList } from "../enums/data.enum";

export class ChangeRawDataStatusDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    public id: string;

    @IsEnum(rawStatusList, {
        message: `Possible status are ${rawStatusList}`
    })
    public status: RawDataStatus;
}