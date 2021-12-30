import mongoose from 'mongoose';

const localiteSchema = mongoose.Schema({
    nomloc:{type:String,required:true},
});
localiteSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
localiteSchema.set('toJSON', {
    virtuals: true
});
export default mongoose.model("Localite",localiteSchema);