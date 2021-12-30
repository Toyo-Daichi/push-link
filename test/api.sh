#!/bin/bash

type=POST
parm='{"site":"https://localhost:3000"}'
site='https://niqu644je9.execute-api.ap-northeast-1.amazonaws.com/api/resource/add/'

curl -X ${type} -H "Content-Type:application/json" -d ${parm} ${site}