resource "aws_api_gateway_rest_api" "customers" {
  name        = "customers-api"
  description = "API for customer resources"
}

resource "aws_api_gateway_resource" "customer_id" {
  rest_api_id = aws_api_gateway_rest_api.customers.id
  parent_id   = aws_api_gateway_rest_api.customers.root_resource_id
  path_part   = "customers"
}

resource "aws_api_gateway_resource" "customer_id_path" {
  rest_api_id = aws_api_gateway_rest_api.customers.id
  parent_id   = aws_api_gateway_resource.customer_id.id
  path_part   = "{customerId}"
}

resource "aws_api_gateway_method" "get_customer" {
  rest_api_id   = aws_api_gateway_rest_api.customers.id
  resource_id   = aws_api_gateway_resource.customer_id_path.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_get_customer" {
  rest_api_id             = aws_api_gateway_rest_api.customers.id
  resource_id             = aws_api_gateway_resource.customer_id_path.id
  http_method             = aws_api_gateway_method.get_customer.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.customers.invoke_arn
}

resource "aws_lambda_permission" "apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.customers.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.customers.execution_arn}/*/*"
}


resource "aws_api_gateway_deployment" "customers" {
  depends_on  = [aws_api_gateway_integration.lambda_get_customer]
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
