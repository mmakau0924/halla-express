git pull
yarn run build
pm2 delete "halla-express"
pm2 start npm --name "halla-express" -- start
