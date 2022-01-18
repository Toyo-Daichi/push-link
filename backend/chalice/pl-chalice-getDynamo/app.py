# -*- coding: utf-8 -*-
"""
Created from 2021.12.31
@author: Toyo_Daichi
"""

from chalice import Chalice
import json
import logging
from logging import getLogger, StreamHandler, Formatter
import os
#
from chalicelib.dynamo import dynamo_api

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
@app.route('/history/{num}', methods=['GET'], content_types=['application/json'], cors=True)
def main(num):
  try:
    return_list = []
    response = seaquence_table.get_item({"name": "id"})
    max_num = int(response['Item']['seq'])
    min_num = max_num - int(num)
    for _index in range(min_num, max_num):
      _info = _get_site(_index)
      # remove not returned info
      _info.pop('id')
      _info.pop('state')
      _info.pop('kind')
      # transfer key name
      _info = _change_key_dict(_info, 'date', 'title')
      _info = _change_key_dict(_info, 'site', 'cardTitle')
      _info['labels'] =  ', '.join(_info['labels'])
      _info = _change_key_dict(_info, 'labels', 'cardSubtitle')
      _info = _change_key_dict(_info, 'comments', 'cardDetailedText')
      #
      return_list.append(_info)

    return {
      'statusCode': 200,
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      'body': return_list,
    }

  except Exception as e:
    logger.error('Error getting Dynamo message: {}, {}'.format(e))
    return {
      'statusCode': 500,
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      'body': json.dumps('Sorry ... :( ')
    }

"""SubTools"""
def _get_site(index):
  try:
    response =  site_table.get_item({"id": index, "state": "v0"})
    return response['Item']
  
  except Exception as e:
    logger.error('Error reading DynamoDB Table: {}'.format(e))

def _change_key_dict(dict, old_key, new_key, default_value=None):
  dict[new_key] = dict.pop(old_key, default_value)
  return dict