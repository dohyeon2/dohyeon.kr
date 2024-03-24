import { User } from "../../user/user.interface";
import { UserImpl } from "../../user/user.model";

interface AuthorContructorArgs {
    id?: string;
    name?: string;
}

export class AuthorImpl extends UserImpl implements User {}
