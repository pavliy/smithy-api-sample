$version: "2"

namespace uk.co.samplecompany

use aws.apigateway#integration

@http(method: "GET", uri: "/customers/{customerId}", code: 200)
@readonly
@integration(
    type: "aws_proxy"
    uri: "arn:aws:apigateway:${awsRegion}:lambda:path/2015-03-31/functions/${getCustomerLambdaArn}/invocations"
    httpMethod: "POST"
    passThroughBehavior: "when_no_match"
)
operation GetCustomer {
    input: GetCustomerInput,
    output: GetCustomerOutput,
    errors: [BadRequestError, InternalFailureError]
}

@input
structure GetCustomerInput {
    @required
    @httpLabel
    @pattern("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")
    customerId: String,
}

@output
structure GetCustomerOutput {
    @required
    customer: Customer,
}