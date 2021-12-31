# -*- coding: utf-8 -*-
"""
Created from 2021.12.29
@author: Toyo_Daichi
"""

from chalice import Chalice
from datetime import datetime, timedelta, timezone
import json
import logging
from logging import getLogger, StreamHandler, Formatter
import os
#
from chalicelib.dynamo import dynamo_api
from chalicelib.ses import ses_api

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
@app.route('/resource/add', methods=['POST'], content_types=['application/json'])
def main():
  # webapi info.
  id = seaquence_table.update_seq({'name':'id'})
  now = datetime.now(timezone(timedelta(hours=+9),'Asia/Tokyo')) 
  date = {'date': now.strftime('%Y-%m-%dT%H:%M:%S%z')}
  state = {'state':'v0'}
  #
  info = app.current_request.json_body
  #
  comments = {'comments': info['comments']}
  site = {'site': info['site']}
  labels = {'labels': info['labels']}

  try:
    site_table.put_item(id, date, state, comments, site, labels)
    _send_mail()   
    
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
    logger.error('Error adding Dynamo message: {}, {}'.format(e,info))
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
def _send_mail(type):
  # Mail Contents
  mail_to, mail_from = os.environ['MAIL_TO'], os.environ['MAIL_FROM']
  mail_subject = '登録報告完了'
  mail_method = ses_api(mail_from)

  #s3 read
  s3_mail_announce = s3_api('toyooka-s3-alert', 'mail/recover.txt')
  _message = s3_mail_announce.s3_obj_read()

  #
  mail_message = _message.replace(
      '<EC2InstanceId>', ec2_instanceId
    )
  #
  try:
    response_email = mail_method.send_email(mail_to,mail_subject,mail_message)
    logger.debug('Sending message.')
  except Exception as e:
    logger.error('Error adding Dynamo message: {}'.format(e))

  return response_email