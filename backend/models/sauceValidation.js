const validate = require('mongoose-validator'); // plugin mongoose-validator

// validation des champs de saisie


// Validation du champ name
exports.nameValidator = [ 
  validate({
    validator: 'isLength',
    arguments: [3, 50], 
    message: 'Le nom doit être compris entre 3 et 50 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, // Regex s
    message: "utiliser des chiffres et des lettres pour le champs nom",
  }),
];


// Validation du champ manufacturer
exports.manufacturerValidator = [  
  validate({
    validator: 'isLength',
    arguments: [3, 30], 
    message: 'Le nom du fabricant compris entre 3 et 30 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, 
    message: "utiliser des chiffres et des lettres pour le fabricant",
  }),
];


//Validation pour le champ decription 
exports.descriptionValidator = [ //  
  validate({
    validator: 'isLength',
    arguments: [4, 110],
    message: 'La description compris entre 4 et 110 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, 
    message: "Vous ne pouvez utiliser que des chiffres et des lettres pour la description de la sauce",
  }),
];


// Validation du champ pepper
exports.pepperValidator = [ 
  validate({
    validator: 'isLength',
    arguments: [3, 30], 
    message: 'Le principal ingrédient compris entre 3 et 30 caractères',
  }),
  validate({
    validator: 'isAlphanumeric', 
    message: "Ne peut contenir que des caractères alphanumériques entre 3 et 30 caractères",
  }),
];
