import mongoose from 'mongoose';

const compteSchema = mongoose.Schema({
    login:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});
compteSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
compteSchema.set('toJSON', {
    virtuals: true
});
export default mongoose.model("Compte",compteSchema);