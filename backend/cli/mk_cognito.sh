#!/bin/bash
# Created on 2022.01.31 
# Made use of Terraform

#----------------------------------------------------------------------
# +++ Set configure
#----------------------------------------------------------------------
sysname='pl'
type='cognito'
uses='pool'
env='dev'
#
pool_name=${sysname}-${type}-${uses}-${env}

#----------------------------------------------------------------------
# +++ make Cognito Pool @Terraform
#----------------------------------------------------------------------

echo 'Normal END'

exit