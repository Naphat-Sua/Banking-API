import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint()
export class CheckNumber implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return !isNaN(Number(text)) ? true : false
    }

    defaultMessage(args: ValidationArguments) {
        return 'You must submit in numbers only.';
    }
}
