import { Rules } from "@prisma/client";

export const rulesList = [
    Rules.required,
    Rules.numeric,
    Rules.number,
    Rules.alphanumeric,
    Rules.date_format,
    Rules.optional,
    Rules.enum,
    Rules.string,
]