# Install Dependencies
yarn install

# Start the react app
if [ "$1" == "true" ]
then
  yarn start-https
else
  yarn start
fi
