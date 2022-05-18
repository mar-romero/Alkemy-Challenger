const { Router } = require('express');
const multer = require('multer');
const upload = multer();


const {
    getAllCharacters, 
    createCharacter, 
    updateCharacter, 
    getCharacterById, 
    deleteCharacter,
    associeteMovie,
    uploadCharacterImage
} = require('../controllers/characters');


const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    asociationRequestValidation,
 
} = require('../middlewares/characters');


const router = Router();

///:id(\\d+)/ con esto hago que sea numero si o si el id que envio

router.get('/', getAllRequestValidation, getAllCharacters);
router.post('/', postRequestValidations, createCharacter);
router.put('/:id(\\d+)/', putRequestValidations, updateCharacter);
router.get('/:id(\\d+)/', getRequestValidation, getCharacterById);
router.delete('/:id(\\d+)/', deleteRequestValidations, deleteCharacter);
router.put('/:idCharacter(\\d+)/movies/:idMovie(\\d+)/',asociationRequestValidation,associeteMovie);
router.post('/image',upload.single('image'),uploadCharacterImage);

module.exports = router;