import mongoose from 'mongoose';


const reservationSchema = mongoose.Schema({
    datearrive:{type:Date,required:true},
    etatres:{type:String,required:true},
    destination:{type:String},
    commentaire:{type:String},
    nbrvoyageur:{type:Number},
    client:{type:mongoose.Schema.Types.ObjectID,ref:'Client'},
    vehicule:{type:mongoose.Schema.Types.ObjectID,ref:'Vehicule'}
});
reservationSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
reservationSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.model("Reservation",reservationSchema);