const mongoose=require('mongoose');

const connectDB=async()=>{

    try{
//mongoose connection string
mongoose.set('strictQuery', true);
const con =await mongoose.connect(process.env.MONGO_URI,{
useNewUrlParser:true,
useUnifiedTopology:true,
// useFindAndModify:false,
// useCreateIndex:true
})

console.log(`mongodb connection :${con.connection.host}`);
}catch(err){
console.log(err);
process.exit(1);
    }
}

module.exports=connectDB

