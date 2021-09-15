const Sauce = require('../models/Sauce');// Récupération du modèle 'sauce'

// Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs')


// exprter une fonction Permet de créer une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({       
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};


// exprter une fonction Permet recupere toutes les sauces 
exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

// exprter une fonction Permet recupere une sauce specifique 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};
  




// exprter une fonction Permet modifier une sauce specifique
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};


// exprter une fonction Permet supprimer une sauce specifique
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};




// exprter une fonction Permet de liker ou disliker une sauce specifique
exports.likeSauce = (req, res, next) => {  
  Sauce.findOne({_id: req.params.id })
  .then(sauce => {
    //L'instruction switch évalue une expression et, selon le résultat obtenu et le cas associé, exécute les instructions correspondantes.
    switch (req.body.like) {
      //valeur 1(Like)
      case -1  :
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: {dislikes:1},
          $push: {usersDisliked: req.body.userId},
          _id: req.params.id
      }).then(() => res.status(201).json({ message: 'Dislike ajouté !'}))
      .catch( error => res.status(400).json({ error }))
      break; 

      //valeur2:

      case  0 :
        // premier cas du 2 valeur (dislike)
        if (sauce.usersLiked.find(user => user === req.body.userId)) {
          Sauce.updateOne({ _id : req.params.id }, {
          $inc: {likes:-1},
          $pull: {usersLiked: req.body.userId},
          _id: req.params.id
          }).then(() => res.status(201).json({message: ' Like retiré !'}))
          .catch( error => res.status(400).json({ error }))
        }
        // dexiéme cas du 2 valeur (dislike)
        if (sauce.usersDisliked.find(user => user === req.body.userId)) {
          Sauce.updateOne({ _id : req.params.id }, {
            $inc: {dislikes:-1},
            $pull: {usersDisliked: req.body.userId},
            _id: req.params.id
          }).then(() => res.status(201).json({message: ' Dislike retiré !'}))
          .catch( error => res.status(400).json({ error }));
        }      
      break;
      //valeur 3(Like)
      case 1 :
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { likes:1},
          $push: { usersLiked: req.body.userId},
          _id: req.params.id
        }).then(() => res.status(201).json({ message: 'Like ajouté !'}))
        .catch( error => res.status(400).json({ error }));
      break;


      // valeur 4 par defaut
      default:
      return res.status(500).json({ error })

    }
  }).catch(error => res.status(500).json({ error }))
}


       
  