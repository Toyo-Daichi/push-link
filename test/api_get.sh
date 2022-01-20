#!/bin/bash

num=5
site="https://2452cfxjbc.execute-api.ap-northeast-1.amazonaws.com/api/history/${num}"
curl ${site}

echo 'Normal END'

exit
