FROM continuumio/anaconda3:2021.05-amazonlinux
#
RUN pip install --upgrade pip && \
  pip install awscli && \
  pip install boto3
RUN yum install -y jq && \
  yum install -y zip
#
ARG USERNAME=docker-toyo
ARG GROUPNAME=docker-group
ARG UID=1000
ARG GID=1000
RUN groupadd -g ${GID} -o ${GROUPNAME} && \
  useradd -m -s /bin/bash -u ${UID} -g ${GID} ${USERNAME}
#
USER ${USERNAME}
WORKDIR /home/${USERNAME}
