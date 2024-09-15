import { RawDataPriority, Rules, ValidationStatus } from "@prisma/client";

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

export const priorityList = [
    RawDataPriority.HIGH,
    RawDataPriority.LOW,
    RawDataPriority.MEDIUM,
]

export const validationStatusList = [
    ValidationStatus.NOT_PROCESSED,
    ValidationStatus.PENDING,
    ValidationStatus.PROCESSED,
]