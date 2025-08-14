import type { LambdaInterface
} from '@aws-lambda-powertools/commons/types';
import { APIGatewayEvent, APIGatewayProxyResult, Context
} from 'aws-lambda';
import { StatusCodes
} from 'http-status-codes';
import { GetCustomerHandler
} from './application/getCustomerHandler';
import { MissingRequiredParameterError } from './application/errors/missingRequiredParameterError';
import { CustomersRepository } from './infra/customersRepository';

export class GetCustomerLambdaFunction implements LambdaInterface {
    constructor(private readonly getCustomerHandler: GetCustomerHandler) {}
  public async handler(
    event: APIGatewayEvent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _context?: Context,
  ): Promise<APIGatewayProxyResult> {

    const customerId = event?.pathParameters?.customerId;
    if (!customerId) {
      const error = new MissingRequiredParameterError('customerId');
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: JSON.stringify(error),
            };
        }

    const customer = await this.getCustomerHandler.handle(customerId);
    return {
        statusCode: customer ? StatusCodes.OK : StatusCodes.NOT_FOUND,
        body: JSON.stringify(customer),
        headers: {
            'Content-Type': 'application/json',
            },
        }
    }
}

const getCustomerLambdaFunction = new GetCustomerLambdaFunction(new GetCustomerHandler(
  new CustomersRepository(),
));

export const handler = getCustomerLambdaFunction.handler.bind(
  getCustomerLambdaFunction,
);
