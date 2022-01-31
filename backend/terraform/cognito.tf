variable "aws_cognito_user_pool_client" {
  default = "user_pool"
}

resource "aws_cognito_user_pool" "user_pool" {
  name = "pl-pool"
  mfa_configuration = "ON"
}
