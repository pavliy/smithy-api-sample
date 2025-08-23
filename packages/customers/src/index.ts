import { APIGatewayProxyHandler } from 'aws-lambda';
import { GetCustomerHandler
} from './application/getCustomerHandler';
import { CustomersRepository } from './infra/customersRepository';
import { apiGatewayHandlerFactory } from './apiGatewayHandlerFactory';
import { getGetCustomerHandler, GetCustomerInput } from '@packages/customers-ssdk';

const getCustomerHandler = new GetCustomerHandler(new CustomersRepository());

export const handler: APIGatewayProxyHandler = apiGatewayHandlerFactory(getGetCustomerHandler((input: GetCustomerInput) => getCustomerHandler.handle(input)));