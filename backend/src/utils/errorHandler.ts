class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {}

  static get(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  santinizeError(error: any, errorMessage: string = ''): string {
    let message: string;
    if (error?.code) {
      switch (error.code) {
        case '23505':
          message = error.detail;
          break;
        default:
          message = 'Error occurs';
      }
    } else {
      for (let errorName in error.errorors) {
        if (error.errorors[errorName].message)
          message = error.errorors[errorName].message;
      }
    }

    return !!message.length ? message : errorMessage;
  }
}

const errorHandler: ErrorHandler = ErrorHandler.get();

export { errorHandler as ErrorHandler };
