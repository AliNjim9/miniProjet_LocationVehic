import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    nomclient:{type:String,required:true,unique:true},
    adresseclient:{type:String,required:true},
    telclient:{type:Number,required:true},
    mailclient:{type:String,required:true},
    compte:{type:mongoose.Schema.Types.ObjectID,ref:'Compte',required:true}
});
clientSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
clientSchema.set('toJSON', {
    virtuals: true
});
export default mongoose.model("Client",clientSchema);
   