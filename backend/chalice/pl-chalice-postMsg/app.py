# -*- coding: utf-8 -*-
"""
Created from 2021.12.27
@author: Toyo_Daichi
"""

from chalice import Chalice
import os
import logging
from logging import getLogger, StreamHandler, Formatter
from slack_sdk import WebClient

app = Chalice(app_name='post-msg')
client = WebClient(token=os.environ['SLACK_TOKEN'])
channel = os.environ['SLACK_CHANNEL']
#
logger = getLogger('Logs')
logger.setLevel(logging.DEBUG)
#
stream_handler = StreamHandler()
handler_format = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
stream_handler.setLevel(logging.DEBUG)
stream_handler.setFormatter(handler_format)
logger.addHandler(stream_handler)

#@app.schedule('cron 20 17 ? * SUN-THU *')
@app.lambda_function()
def main(event,content):
  try:
    site = 'https://localhost'
    msg = '今日の技術サイト：{}'.format(site)
    submit = msg
    result = client.chat_postMessage(
      channel = channel,
      text = submit
    )
    logger.debug(result)
    logger.debug('Normal END')
  
  except Exception as e:
    logger.error('Error posting message: {}'.format(e))

