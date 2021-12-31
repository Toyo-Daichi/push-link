#!/bin/bash
# Created on 2021.11.29

#----------------------------------------------------------------------
# +++ Set configure
#----------------------------------------------------------------------
export AWS_PROFILE='adminUser-On38'
export AWS_DEFAULT_REGION='ap-northeast-1'
#
image_name='anaconda/aws-cli'
user_name='docker-toyo'
#
statuses='create login'

#----------------------------------------------------------------------
# +++ Start container
#----------------------------------------------------------------------
select status in ${statuses}; do
  if [ ${status} = 'create' ]; then
    docker build --platform linux/amd64 -t ${image_name} .
  elif [ ${status} = 'login' ]; then
    echo '============================================================'
    echo ' +++ AWS_PROFILE' ${AWS_PROFILE}  
    echo ' Check "export AWS_ACCOUNT_ID=XXXX-XXXX-XXXX"'
    echo '============================================================'
    docker run -it --rm \
      -v ${HOME}/:/home/${user_name} -v ${HOME}/.aws/:/home/${user_name}/.aws \
      -e AWS_PROFILE -e AWS_DEFAULT_REGION \
      ${image_name} /bin/bash
  fi
  break
done

echo 'Normal END'
exit
