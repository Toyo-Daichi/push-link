terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  profile = var.aws_profile
  region = var.aws_region

  default_tags {
    tags = {
      system = var.sysname
      env = var.env
    }
  }
}