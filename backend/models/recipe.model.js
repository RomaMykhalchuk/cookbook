const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
   category:{type:String,required:true},
   title:{type:String,required:true,unique:true,trim:true,minlength:3},
   description:{type:String,required:true,minlength:10}},
   {
     timestamps:true
   });

   const Recipe = mongoose.model('Recipes',recipeSchema);
   module.exports = Recipe;