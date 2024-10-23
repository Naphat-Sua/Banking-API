import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint()
export class CheckPromptpay implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        const checkString = /\d{10}|\d{13}/
        return (text.length === 10 || text.length === 13) && checkString.test(text);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Only 10 or 13 numbers can be entered.';
    }
}
