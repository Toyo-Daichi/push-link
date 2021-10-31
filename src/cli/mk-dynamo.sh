#!/bin/bash
# Created on 2021.10.31

#----------------------------------------------------------------------
# +++ make dynamoDB
#----------------------------------------------------------------------

create_table() {
  aws dynamodb create-table --cli-input-json file://${table_file}
  sleep 10s
}

put_items() {
  item_length=`cat ${items_file} | jq ".Items | length"`

  if [ ${item_length} -gt 0 ]; then
    imax=`expr ${item_length} - 1`
    for i in `seq 0 ${imax}`; do
      item=`cat ${items_file} | jq ".Items[${i}]"`
      aws dynamodb put-item --table-name ${table_name} --item "${item}"
    done
  fi
}

#----------------------------------------------------------------------
# +++ Execution
#----------------------------------------------------------------------
echo 'Replace Table Name'
vi ${HOME}/${table_file}
#
echo 'Recommend: Vim replace command :%s/before/after/g'
read -p "Need Edit ?? (y/N)" yn
if [[ ${yn} == [yY] ]]; then
  vi ${items_file}
fi
#
create_table
put_items

echo 'Normal END'

exit

