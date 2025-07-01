import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  text: {type:String,required:true},
  type: { type: String, enum: ['slider', 'emoji', 'multiple', 'sleep', 'text'], required: true },
  options: [{text:String,score:Number}],
  //for sliders
  min: Number,
  max: Number,
  category: String
});

const Question = mongoose.model('Question',questionSchema);
export default Question;