interface UserConstructorArgs {
    id?: string;
    name?: string;
}

export class User {
    id: string;
    name: string;

    constructor({ id = "", name = "" }: UserConstructorArgs) {
        this.id = "";
        this.name = "";
    }
}
