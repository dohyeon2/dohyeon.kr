import { v4 } from "uuid";
import { User } from "./user.interface";
import { generateRandomUserName } from "@/lib/internal/user/name/generateRandomUserName";

interface UserConstructorArgs {
    id?: string;
    name?: string;
}

export class UserImpl implements User {
    id: string;
    name: string;

    constructor({ id, name }: UserConstructorArgs = {}) {
        this.id = id ?? v4();
        this.name = name ?? this.generateRandomName();
    }

    private generateRandomName = generateRandomUserName;
}
