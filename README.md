## crm-server-ts
# docs![Screenshot from 2023-02-15 12-07-18](https://user-images.githubusercontent.com/45355788/218951629-0e24495a-138a-444a-8d02-cf476b363efc.png)

https://documenter.getpostman.com/view/21601681/2s935rJ2Fk

# live ssr project
https://crm-server-ts.onrender.com/
# required env variables
HOST=localhost
PORT=5000
NODE_ENV="development"

# mongodb environment variables
DB_URL=mongodb+srv://username:password@cluster_name/?retryWrites=true&w=majority

# jwt auth keys
`default 1 minute`
JWT_ACCESS_EXPIRE="" like -> 1h,1m,10s etc.
JWT_ACCESS_USER_SECRET=some strong secret
COOKIE_EXPIRE=5 //in minutes

# cloudinary keys
CLOUDINARY_API_KEY=********************
CLOUDINARY_SECRET_KEY=*************
CLOUDINARY_CLOUD_NAME=*****

# email facilities
EMAIL_HOST=smptp.your_service.com
EMAIL_PORT= service port
EMAIL_SERVICE=service name
APP_EMAIL=email id
APP_EMAIL_PASSWORD=email password
