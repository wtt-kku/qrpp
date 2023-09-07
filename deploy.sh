DIR="./.next"
if [ -d "$DIR" ]; then
  # Take action if $DIR exists. #
  echo "Installing config files in ${DIR}..."
  rm -rf ./.next
fi

npm run build

pm2 --name "QR-API" start server.js
