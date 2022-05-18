const { Router } = require('express');
const multer = require('multer');
const upload = multer();


const {
    getAllMovies, 
    createMovie, 
    updateMovie, 
    getMovieById, 
    deleteMovie,
    associeteCharacter,
    uploadMovieImage
} = require('../controllers/movies');
const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    asociationRequestValidation
} = require('../middlewares/movies');


const router = Router();
///:id(\\d+)/ con esto hago que sea numero si o si el id que envio

router.get('/', getAllRequestValidation, getAllMovies);
router.post('/', postRequestValidations, createMovie);
router.put('/:id(\\d+)/', putRequestValidations, updateMovie);
router.get('/:id(\\d+)/', getRequestValidation, getMovieById);
router.delete('/:id(\\d+)/', deleteRequestValidations, deleteMovie);
router.put('/:idMovie(\\d+)/characters/:idCharacter(\\d+)/',asociationRequestValidation,associeteCharacter);
router.post('/image',upload.single('image'),uploadMovieImage);

module.exports = router;