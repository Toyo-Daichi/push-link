# -*- coding: utf-8 -*-
"""
Created on 2021.11.22 ... Version 1.0
author: Toyooka
"""

import boto3
import io
#
s3_client = boto3.client('s3')
s3_resource = boto3.resource('s3') 

class s3_api:
  def __init__(self, bucket_name, object_name, *, api_type='resource'):
    if api_type == 'client':
      self.s3_client_bucket = s3_client.get_object(Bucket_name=bucket_name, Key=object_name)
    elif api_type == 'resource':
      # object control
      self.s3_resource_bucket = s3_resource.Bucket(bucket_name)
      self.s3_resource_obj = self.s3_resource_bucket.Object(object_name)

  def s3_obj_list(self):
    return    

  def s3_obj_read(self):
    response = self.s3_resource_obj.get()
    body = response['Body'].read()
    
    return body.decode('utf-8')

  def _confirm_gzip(self, obj) -> bool:
    pass