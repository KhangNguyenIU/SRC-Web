import { Request, Response } from 'express';
class ValidatorMiddleware {
  private static instance: ValidatorMiddleware;

  constructor() {}

  static get(): ValidatorMiddleware {
    if (!ValidatorMiddleware.instance) {
      ValidatorMiddleware.instance = new ValidatorMiddleware();
    }
    return ValidatorMiddleware.instance;
  }

  check = (schema: any) => {
    return (req: Request, res: Response, next): void => {

        const error = ['query', 'params', 'body']
          .filter((property: string) => schema[property] && req[property])
          .map(
            (property: string): { error: any } =>
              schema[property].validate(req[property], {
                abortEarly: true,
                allowUnknown: false,
              }) as { error: any }
          )
          .filter((result) => result.error)
          .map((result) => result.error as Error)
          .slice()
          .shift();
        if (!error) {
          next();
        } else {
          res.status(400).send(error['details'][0].message);
        }
  
    };
  };
}

const validatorMiddleware = ValidatorMiddleware.get();

export { validatorMiddleware as ValidatorMiddleware };
