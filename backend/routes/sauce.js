const express = require('express');

const router = express.Router();//appel du routeur avec la méthode mise à disposition par Express


const auth = require('../middleware/auth');//sécuriser les routes
const multer = require('../middleware/multer-config');//gestion des images

const sauceCtrl = require('../controllers/sauce');//associe les fonctions aux différentes routes



router.post('/', auth, multer, sauceCtrl.createSauce);// Route pour créer les sauces 


router.get('/', auth,  sauceCtrl.getAllSauce);// router pour  récuper toute les sauces


router.get('/:id', auth, sauceCtrl.getOneSauce);//Route qui permet de cliquer sur une des sauces précise(id)

router.put('/:id', auth, multer, sauceCtrl.modifySauce);//Route qui permet de modifier "une sauce"

router.delete('/:id', auth, sauceCtrl.deleteSauce);// Route qui permet de supprimer "une sauce"

router.post('/:id/like', auth, sauceCtrl.likeSauce);//Route qui permet de gérer les likes des sauces


module.exports = router;