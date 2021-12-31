# -*- coding: utf-8 -*-
"""
Created on 2021.11.22 ... Version 1.0
author: Toyooka
"""

import boto3
ses = boto3.client('ses')

class ses_api:
  def __init__(self, mail_from):
    self.mail_from = mail_from

  def send_email(self, mail_to, mail_subject, mail_message):
    response = ses.send_email(
      Source = self.mail_from,
      ReplyToAddresses = [self.mail_from],
      Destination = {
        'ToAddresses': [mail_to]
      },
      Message = {
        'Subject': {
          'Data': mail_subject, 'Charset': 'UTF-8',
        },
        'Body': {
          'Text': {
            'Data': mail_message, 'Charset': 'UTF-8'
          }
        }
      }
    )

    return 