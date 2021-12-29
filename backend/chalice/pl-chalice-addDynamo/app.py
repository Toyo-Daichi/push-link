# -*- coding: utf-8 -*-
"""
Created from 2021.12.29
@author: Toyo_Daichi
"""

from chalice import Chalice
import json
import logging
from logging import getLogger, StreamHandler, Formatter
import os
#
from chalicelib.dynamo import dynamo_api
from chalicelib.ses import ses_api
from chalicelib.s3 import s3_api

"""config"""
app = Chalice(app_name='pl-chalice-addDynamo')
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
@app.route('/resource/add', methods=['POST'])
def main():
  try:
    return {
      'statusCode': 200,
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      'body': json.dumps('Good job :) '),
    }

  except Exception as e:
    logger.error('Error posting message: {}'.format(e))
    return {
      'statusCode': 500,
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      'body': json.dumps('Sorry ... :( ')
    }

"""SubTools"""
