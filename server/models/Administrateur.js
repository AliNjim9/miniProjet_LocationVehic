import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    nomadmin:{type:String,required:true},
    adresseadmin:{type:String,required:true},
    typeadmin:{type:String,required:true,unique:true},
    compte:{type:mongoose.Schema.Types.ObjectID,ref:'Compte'},
});
adminSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
adminSchema.set('toJSON', {
    virtuals: true
});
export default mongoose.model("Adiministrateur",adminSchema);