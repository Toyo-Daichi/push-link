resource "aws_cognito_user_pool" "user_pool" {
  name = "${var.user_pool_name}-${var.env}"
  auto_verified_attributes = [
    "email"
  ]
  #
  mfa_configuration = "ON"
  software_token_mfa_configuration {
    enabled = true
  }
  #
  admin_create_user_config {
    allow_admin_create_user_only = false
  }
  password_policy {
    minimum_length = 12
    require_lowercase = true
    require_uppercase = true
    require_numbers = true
    require_symbols = true
    temporary_password_validity_days = 30
  }
  schema {
    attribute_data_type = "String"
    name = "email"
    required = true
  }
}

resource "aws_cognito_user_pool_client" "app_client" {
  name = "${var.app_pool_name}-${var.env}"
  user_pool_id = aws_cognito_user_pool.user_pool.id
}

resource "aws_cognito_identity_pool" "id_pool" {
  identity_pool_name = "${var.id_pool_name}-${var.env}"
  allow_unauthenticated_identities = false
  cognito_identity_providers {
    client_id = aws_cognito_user_pool_client.app_client.id
    provider_name = aws_cognito_user_pool.user_pool.endpoint
    server_side_token_check = false
  }
}