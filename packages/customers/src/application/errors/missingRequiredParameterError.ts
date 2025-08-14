export class MissingRequiredParameterError extends Error {
  constructor(parameterName: string) {
    super(`Missing Required Parameter '${parameterName}'`);
    this.name = 'MissingRequiredParameterError';
    (this as any).parameterName = parameterName;
  }
}
