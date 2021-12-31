#!/bin/bash
# Created on 2021.12.31

#----------------------------------------------------------------------
# +++ Set configure
#----------------------------------------------------------------------
sysname='pl'
type='s3'
use='mail'
bucket_name=${sysname}-${type}-${use}
object_path=`pwd`/components/
#
status='upload' # 'create' or 'upload'

#----------------------------------------------------------------------
# +++ Functions
#----------------------------------------------------------------------
create_bucket(){
  aws s3 mb s3://${bucket_name}
}

attach_bucket_policy(){
  cat << EOF > ${object_path}/access_policy.json
{
  "Version": "2012-10-17",
  "Id": "allowed only cloudfront access",
  "Statement": [
    {
      "Sid": "APIReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E3PG4BL7GQUT1"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${bucket_name}/*"
    }
  ]
}
EOF
  #
  aws s3api put-bucket-policy --bucket ${bucket_name} --policy file://${object_path}/access_policy.json
}

upload_file(){
  aws s3 sync ${object_path} s3://${bucket_name} --include '*' --exclude '*.json' --acl public-read 
  #check
  #aws s3 sync ${object_path} s3://${bucket_name} --dryrun --include '*' --exclude '*.json' --acl public-read 
}

delete_bucket(){
  aws s3 rb s3://${bucket_name} --force  
}

website_file(){
  aws s3 website s3://${bucket_name} --index-document index.html --error-document error.html
}

#----------------------------------------------------------------------
# +++ make s3
#----------------------------------------------------------------------
if [ ${status} = 'create' ]; then
  create_bucket
  if [ ${use} = 'web' ]; then
    attach_bucket_policy
    rm ${object_path}/access_policy.json
  fi

elif [ ${status} = 'upload' ]; then
  upload_file
  if [ ${use} = 'web' ]; then
    website_file
  fi

elif [ ${status} = 'delete' ]; then
  delete_bucket
fi

echo 'Normal END'

exit