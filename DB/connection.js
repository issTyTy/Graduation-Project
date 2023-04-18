import mongoose from 'mongoose';


const connectDB = async () => {
    return await mongoose.connect(process.env.DB_LOCAL)
        .then(result => {
            console.log(`DB Connected on ................ `)
        }).catch(err => console.log(`Fail to connect on DB  ,,,,,,,,,,,,,,,,,,,,,,,, ${err}`))
}

export default connectDB