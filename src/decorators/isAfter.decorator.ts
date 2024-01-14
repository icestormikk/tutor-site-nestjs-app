import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function IsAfter(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsAfterConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsAfter' })
class IsAfterConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const [relatedPropertyName] = validationArguments.constraints;
    const relatedValue = (validationArguments.object as any)[
      relatedPropertyName
    ];

    return new Date(value) > new Date(relatedValue);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    const [relatedPropertyName] = validationArguments.constraints;

    return `The date specified in this field must be greater than in the ${relatedPropertyName} field'`;
  }
}
