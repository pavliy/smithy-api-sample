terraform {

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.0.0-beta2"
    }
  }

  required_version = "~> 1.12.2"
}

provider "aws" {
  region = "eu-west-1"

  assume_role {
    role_arn = "arn:aws:iam::654654155623:role/AWSInfraManagement"
  }

  default_tags {
    tags = {
      "Smity-API-Sample" = "true"
    }
  }
}
