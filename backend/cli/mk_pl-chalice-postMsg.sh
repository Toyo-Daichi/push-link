#!/bin/bash
# Created on 2021.12.27

echo 'Prepared $chalice new-project function_name'
#
chome=${HOME}/push-link/backend/chalice
export AWS_ACCOUNT_ID=`aws sts get-caller-identity | jq '.Account' | sed 's/"//g' `

#----------------------------------------------------------------------
# +++ Set configure
#----------------------------------------------------------------------
sysname='pl'
type='chalice'
use='postMsg'
app_name=${sysname}-${type}-${use}
config=${chome}/${app_name}/.chalice/config.json
stage='prod'
status='update' # 'create' or 'update'

cat << EOF > ${config}
{
  "version": "2.0",
  "app_name": "${app_name}",
  "stages": {
    "${stage}": {
      "manage_iam_role": false,
      "iam_role_arn": "arn:aws:iam::${AWS_ACCOUNT_ID}:role/lambda_basic_execution",
      "lambda_timeout": 15,
      "environment_variables": {
        "SLACK_TOKEN": "${SLACK_TOKEN}",
        "SLACK_CHANNEL": "${SLACK_CHANNEL}",
        "SITE_TABLE": "${SITE_TABLE}",
        "SEAQUENCE_TABLE": "${SEAQUENCE_TABLE}"
      }
    }
  }
}
EOF

#----------------------------------------------------------------------
# +++ Execution
#----------------------------------------------------------------------
cd ${chome}/${app_name}
if [ ${status} == 'create' ]; then
  pip install -r requirements.txt
fi
#
chalice deploy --stage ${stage}

echo 'Normal END'

exit