const AWS =  require('aws-sdk');
const { reject } = require('bcrypt/promises');
const config = require('../config/index');
const AppError = require('../errors/appError.js')


class ImageRepository{
    
    constructor(){
        this.s3 = new AWS.S3({
            accessKeyId : config.aws.accessKeyId,
            secretAccessKey: config.aws.privateAccessKey
        })
    }

    uploadImage(name, image, type){
        const Key = name+"."+type.split('/')[1];
        var name = Key.replace(/ /g, "");

        return new Promise((resolve, reject)=>{
        const params = {
            Bucket : config.aws.s3BucketName,
            Key:name,
            Body:image,
            ContenType: type,
            ACL: 'public-read'
        };
        this.s3.upload(params,(err,data)=>{
            if(err){
                reject (new AppError(err.message , 502));
            }
            resolve(`https://${config.aws.s3BucketName}.s3.amazonaws.com/${name}`)  ;
        });
        
    })
}
}

module.exports = ImageRepository;