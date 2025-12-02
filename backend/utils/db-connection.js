import mongoose from 'mongoose'

const connectMongodb = async ()=>{
   try {
    await mongoose.connect(process.env.MONGODB_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     })
    console.log('mongodb is connected')
   } catch (error) {
     console.log(error)
   }
}

export default connectMongodb;