data "aws_region" "current" {}

resource "aws_api_gateway_rest_api" "customers" {
  name        = "customers-api"
  description = "API for customer resources"
  body = templatefile("${path.module}/openapi.json", {
    awsRegion            = data.aws_region.current.id
    awsAccountName       = "customers"
    getCustomerLambdaArn = aws_lambda_function.customers.arn
  })
}

resource "aws_api_gateway_deployment" "customers" {
  rest_api_id = aws_api_gateway_rest_api.customers.id
  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.customers.body))
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "prod" {
  stage_name    = "prod"
  rest_api_id   = aws_api_gateway_rest_api.customers.id
  deployment_id = aws_api_gateway_deployment.customers.id
}
