FROM node:17.0.1-slim
#
RUN npm install -g parcel && \
  npm install -g @aws-amplify/cli && \
  npm install -g aws-amplify @aws-amplify/ui-react@1.x.x
#
ARG USERNAME=node
USER ${USERNAME}
WORKDIR /home/${USERNAME}
EXPOSE 3000 8080 39895 
