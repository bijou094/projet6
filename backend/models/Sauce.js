const mongoose = require('mongoose');
//Créer un  schema mangoose pour que les données 
const sauceValidation = require('./sauceValidation');

const sanitizerPlugin = require('mongoose-sanitizer-plugin');


const sauceSchema = mongoose.Schema({
    
    userId : { type: String, required: true },
    name : { type: String, required: true, validator:sauceValidation.nameValidator }, 
    manufacturer : { type: String, required: true, validator:sauceValidation.manufacturerValidator },        
    description : { type: String, required: true, validator:sauceValidation.descriptionValidator}, 
    mainPepper : { type: String, required: true, validator:sauceValidation.pepperValidator }, 
    imageUrl : { type: String, required: true }, 
    heat : { type: Number, required: true },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false }, 
    
});
sauceSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('Sauce', sauceSchema);//// On exporte ce shéma de données, on va donc pouvoir utiliser ce modèle pour intéragir avec l'application