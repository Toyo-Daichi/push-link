variable aws_profile {
  type = string
  description = "AWS Profile name"
  default = "default"
}
variable aws_region {
  type = string
  description = "AWS Region name"
  default = "ap-notrheast-1"
}
variable sysname {
  type = string
  description = "System name"
  default = "pl"
}
variable env {
  type = string
  description = "Current enviroment"
  default = "dev"
}
variable user_pool_name {
  type = string
  description = "AWS Cognito User Pool"
  default = "default"
}
variable app_pool_name {
  type = string
  description = "AWS Cognito Application Client Pool"
  default = "default"
}
variable id_pool_name {
  type = string
  description = "AWS Cognito Identity Pool"
  default = "default"
}