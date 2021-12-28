   
# -*- coding: utf-8 -*-
"""
Created on 2021.11.18 ... Version 1.0
author: Toyooka
"""

import boto3
dynamo = boto3.resource('dynamodb')

class dynamo_api:
  def __init__(self, table):
    self.dynamo_table = dynamo.Table(table)
  
  def put_item(self, *args):
    dict = {}  
    for _arg in args:
      print('>>> Add row, Key-Value:{}'.format(_arg))
      dict.update(_arg)

    response = self.dynamo_table.put_item(Item=dict)
    return response

  def get_item(self, primary_key):
    response =  self.dynamo_table.get_item(
      Key= primary_key
    )
    return response

  def update_item(self, primary_key, update_column, update_value):
    response = self.dynamo_table.update_item(
      Key = primary_key,
      UpdateExpression ='set #update=:update',
      ExpressionAttributeNames={
        '#update': update_column
      },
      ExpressionAttributeValues={
        ':update': update_value
      },
      ReturnValues = 'UPDATED_NEW'
    )
    return response

  def update_seq(self, primary_key):
    response = self.dynamo_table.update_item(
      Key = primary_key,
      UpdateExpression ='set seq = seq + :val',
      ExpressionAttributeValues={
        ':val': 1
      },
      ReturnValues = 'UPDATED_NEW'
    )

    return {'id': int(response['Attributes']['seq'])}