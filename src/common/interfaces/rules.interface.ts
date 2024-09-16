import { Rules } from "@prisma/client";

export interface Rule {
    id: string;
    sourceId: string;
    keyName: string;
    rule: Rules;
    regexPattern?: string;
}