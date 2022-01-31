provider "aws" {
  profile = "personal"
  region = "ap-northeast-1"

  default_tags {
    tags = {
      System = "pl"
    }
  }
}