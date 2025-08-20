
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir = "../../packages/customers/dist"
  output_path = "../../packages/customers/dist/index.zip"
  excludes = [ "index.zip", "._*" ]
}

resource "aws_lambda_function" "customers" {
  function_name    = "customers-handler"
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  role = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      # Add your environment variables here
    }
  }

  # Optional: memory, timeout, etc.
  memory_size = 128
  timeout     = 10
}

resource "aws_iam_role" "lambda_exec" {
  name = "LambdaExecRoleCustomers"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
