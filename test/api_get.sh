#!/bin/bash

num=5
site="https://ftcg0rr8h3.execute-api.ap-northeast-1.amazonaws.com/api/history/${num}"
curl ${site}

echo 'Normal END'

exit
