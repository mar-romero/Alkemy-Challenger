const dotenv = require('dotenv');

const envFound = dotenv.config();
if(!envFound){
    throw new Error("Couldn't find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    port: process.env.PORT,
    api: {
        prefix: '/api'
    },
    log: {
        level: process.env.LOG_LEVEL
    },
    swagger: {
        path: '/documentation'
    },
    database:{
        host: process.env.DATABASE_HOST ,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD ,
        name: process.env.DATABASE_NAME,
    },
    auth: {
        secret : process.env.AUTH_SECRET,
        ttl: process.env.AUTH_TTL
    },
    aws:{
        accessKeyId: process.env.ACCESS_KEY_ID,
        privateAccessKey: process.env.SECRET_ACCESS_KEY,
        s3BucketName: process.env.S3_BUCKET_NAME
    }
}
