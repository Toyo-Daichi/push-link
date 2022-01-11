FROM node:17.0.1-slim
#
RUN npm install -g parcel && \
  npm install -g @aws-amplify/cli && \
  npm install -g aws-amplify @aws-amplify/ui-react@1.x.x
RUN npm install --save typescript && \
	@types/node @types/react @types/react-dom @types/jest
#
ARG USERNAME=node
RUN groupmod -g 1001 node \
  && usermod -u 1001 -g 1001 node
#
USER ${USERNAME}
WORKDIR /home/${USERNAME}
EXPOSE 3000 8080 39895 
