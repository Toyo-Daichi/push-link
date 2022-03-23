#!/bin/bash
# Created on 2022.01.31 

terraform init
terraform plan
terraform apply

echo 'Normal END'

exit