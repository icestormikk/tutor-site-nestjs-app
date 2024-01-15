import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * A decorator for checking the equality of the values of the marked field and the field whose name is specified in the 'property' field
 * @export
 * @param {string} property the name of the field whose value should be equal to the value in the marked field
 * @param {ValidationOptions} [validationOptions] additional validation parameters
 * @return {*} function for parameter validation
 */
export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

/**
 * The logic of the Match decorator
 * @export
 * @class MatchConstraint
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ name: 'Match' })
class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    const [relatedPropertyName] = validationArguments.constraints;

    return `${validationArguments.property} must match ${relatedPropertyName} exactly`;
  }
}
