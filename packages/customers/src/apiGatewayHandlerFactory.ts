import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { convertEvent, convertVersion1Response } from '@aws-smithy/server-apigateway';
import type { APIGatewayProxyHandler } from 'aws-lambda/trigger/api-gateway-proxy';
import type { ServiceHandler } from '@aws-smithy/server-common';

export type HandlerContext = {
	origin: string;
};

export function apiGatewayHandlerFactory(
	handler: ServiceHandler<HandlerContext>
): APIGatewayProxyHandler {
	return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		const requestOrigin = event.headers?.Origin ?? event.headers?.origin ?? '';

		const context = { origin: requestOrigin };
		const httpRequest = convertEvent(event);

		const httpResponse = await handler.handle(httpRequest, context);
		return convertVersion1Response(httpResponse);
	};
}
