# -*- coding: utf-8 -*-
"""
Created from 2021.12.27
@author: Toyo_Daichi
"""

from chalice import Chalice
import json
import logging
from logging import getLogger, StreamHandler, Formatter
import os
import random
from slack_sdk import WebClient
#
from chalicelib.dynamo import dynamo_api

"""config"""
app = Chalice(app_name='pl-chalice-postMsg')
client = WebClient(token=os.environ['SLACK_TOKEN'])
channel = os.environ['SLACK_CHANNEL']
site_table = dynamo_api(os.environ['SITE_TABLE'])
seaquence_table = dynamo_api(os.environ['SEAQUENCE_TABLE'])

"""Logger"""
logger = getLogger('Logs')
logger.setLevel(logging.DEBUG)
#
stream_handler = StreamHandler()
handler_format = Formatter('%(asctime)s - %(lineno)d - %(name)s - %(levelname)s - %(message)s')
stream_handler.setLevel(logging.DEBUG)
stream_handler.setFormatter(handler_format)
logger.addHandler(stream_handler)

"""Main"""
#dev
#@app.lambda_function()
#def main(event,content):

@app.schedule('cron(0 9 ? * MON-FRI *)')
def main():
  
  index = _random()
  response = _get_site(index)
  site = response['site']
  date = response['date']
  labels = response['labels']
  comments = response['comments']
  msg = '今日の技術サイト：{}\nラベル：{}\n入力日：{}\nコメント：{}'.format(site,', '.join(labels),date,comments)
  #
  try:
    result = client.chat_postMessage(
      channel = channel,
      text = msg
    )
    logger.debug(result)

    return {
      'statusCode': 200,
      'body': json.dumps('Good job :) ')
    }

  except Exception as e:
    logger.error('Error posting message: {}'.format(e))

"""SubTools"""
def _get_site(index):
  try:
    response =  site_table.get_item({"id": index, "state": "v0"})
    return response['Item']
  
  except Exception as e:
    logger.error('Error reading DynamoDB Table: {}'.format(e))

def _random():
  response = seaquence_table.get_item({"name": "id"})
  max_num = response["Item"]["seq"]
  return  random.randint(0,max_num)