import mongoose from 'mongoose';

const vehiculeSchema = mongoose.Schema({
    marquev:{type:String,required:true},
    puissancev:{type:String,required:true},
    nbplace:{type:Number,required:true},
    localite:{type:mongoose.Schema.Types.ObjectID,ref:'Localite'},
    typev:{type:mongoose.Schema.Types.ObjectID,ref:'TypeVehicule',required:true}
});
vehiculeSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
vehiculeSchema.set('toJSON', {
    virtuals: true
});
export default mongoose.model("Vehicule",vehiculeSchema);
   