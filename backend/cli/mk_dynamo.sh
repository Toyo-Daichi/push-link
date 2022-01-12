#!/bin/bash
# Created on 2021.11.18

#----------------------------------------------------------------------
# +++ Set configure
#----------------------------------------------------------------------
sysname='pl'
type='dynamo'
uses='seaquence' # 'site' or 'seaquence'
env='prod'
#
table_name=${sysname}-${type}-${uses}-${env}
table_file=./components/${type}-${uses}-info.json
table_body=./components/${type}-${uses}-body.json

#----------------------------------------------------------------------
# +++ make dynamoDB
#----------------------------------------------------------------------
put_items() {
  item_length=`cat $2 | jq ".Items | length"`
  if [ ${item_length} -gt 0 ]; then
    imax=`expr ${item_length} - 1`
    for i in `seq 0 ${imax}`; do
      item=`cat $2 | jq ".Items[${i}]"`
      aws dynamodb put-item --table-name $1 --item "${item}"
    done
  fi
}

aws dynamodb create-table --cli-input-json file://`pwd`/${table_file}
sleep 10s
put_items ${table_name} ${table_body}

echo 'Normal END'

exit