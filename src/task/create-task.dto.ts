import { Type } from "class-transformer";
import { IsArray, IsDate, IsString } from "class-validator";

export class CreateTask {
    @IsString()
    description: string;
    
    @IsDate()
    @Type(() => Date)
    dueDate: Date;

    @IsArray()
    assignedUserIds: number[];
}