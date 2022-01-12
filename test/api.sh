#!/bin/bash

type=POST
parm='{"site":"https://localhost:3000","comments":"example","labels":["AWS","Chalice"],"kind":"Qiita"}'
site='https://niw1ev59c2.execute-api.ap-northeast-1.amazonaws.com/api/resource/add'

curl -X ${type} -H "Content-Type:application/json" -d ${parm} ${site}

echo 'Normal END'

exit
