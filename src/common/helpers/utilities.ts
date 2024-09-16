import { ValidateDataDto } from "src/validation/dto";
import { Rule } from "../interfaces/rules.interface";

export const delay = (ms: number) => {
    return new Promise(
        (res, rej) => {
            setTimeout(() => {
                console.log('Acabó el tiempo ')
                res(true)
            }, ms);
        }
    )
}

export const isFloat = (n: any) => {
    return Number(n) === n && n % 1 !== 0;
}

export const isAlphanumeric = (str: any) => {
    if (typeof str !== "string") return false;
    return str.replace(/[A-Z]|[a-z]|[0-9]/g, "") === "";
}

export const validateByRule = (rules: Rule[], validateDataDto: ValidateDataDto): String[] => {
    const errors = [];
    const evaluatedKeyNames = new Set();

    for (const rule of rules) {
        const keyValue = validateDataDto.dataPayload[rule.keyName];
        evaluatedKeyNames.add(rule.keyName);

        switch (rule.rule) {
            case 'required':
                if (!keyValue) errors.push(`${rule.keyName} is required`);
                break;
            case 'number':
                if (!Number.isSafeInteger(keyValue)) errors.push(`${rule.keyName}: '${keyValue}' should be an integer`);
                break;
            case 'numeric':
                if (!isFloat(keyValue)) errors.push(`${rule.keyName}: '${keyValue}' should be a float`);
                break;
            case 'string':
                if (!(typeof keyValue === 'string')) errors.push(`${rule.keyName}: '${keyValue}' should be a string`);
                break;
            case 'alphanumeric':
                if (!isAlphanumeric(keyValue)) errors.push(`${rule.keyName}: '${keyValue}' should be alphanumeric`);
                break;
            case 'date_format':
                const dateTimeRegExp = new RegExp(rule.regexPattern);
                if (!(dateTimeRegExp.test(keyValue))) errors.push(`${rule.keyName}: '${keyValue}' should be a dateTime like yyyy:mm:ssThh:mm`);
                break;
            case 'enum':
                const enumRegExp = new RegExp(rule.regexPattern);
                if (!(enumRegExp.test(keyValue))) errors.push(`${rule.keyName}: '${keyValue}' should be card, cash or transfer`);
                break;
            default:
                break;
        }
    }
    const cantidadKeyNames = evaluatedKeyNames.size
    const cantidadPayload = Object.keys(validateDataDto.dataPayload).length

    if (cantidadKeyNames !== cantidadPayload) errors.push(`There are different number of keyNames`);

    return errors
}