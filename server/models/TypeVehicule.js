import mongoose from 'mongoose';

const typeVSchema = mongoose.Schema({
    nomtype:{type:String,required:true},
    tarif:{type:mongoose.Types.Decimal128 ,required:true}
});
typeVSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
typeVSchema.set('toJSON', {
    virtuals: true
});
export default mongoose.model("TypeVehicule",typeVSchema);