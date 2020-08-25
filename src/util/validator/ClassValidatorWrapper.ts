import { validateSync } from 'class-validator';
import { ValidationFailedException } from './ValidationFailedException';

export class ClassValidatorWrapper {
  static validate(obj: object) {
    const errors = validateSync(obj, {
      whitelist: false,
      validationError: {
        target: false,
        value: false,
      },
    });

    if (errors.length > 0) {
      throw new ValidationFailedException(errors);
    }
  }
}
