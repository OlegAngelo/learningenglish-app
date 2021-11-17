# pull official base image
FROM node:12.20.0-alpine3.10

WORKDIR /var/www

COPY package.json /var/www/
RUN yarn install

COPY . /var/www/

# Install create-react-app package
RUN yarn global add react-scripts

EXPOSE 3000

ADD ./bootup.sh /var/www
RUN cd /var/www
RUN chmod +x /var/www/bootup.sh
