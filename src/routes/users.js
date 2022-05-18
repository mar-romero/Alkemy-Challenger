const { Router } = require('express');
const {
    getAllUsers, 
    createUser, 
    updateUser, 
    getById, 
    deleteUser,
} = require('../controllers/users');


const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
} = require('../middlewares/users');


const router = Router();
///:id(\\d+)/ con esto hago que sea numero si o si el id que envio
router.get('/', getAllRequestValidation, getAllUsers);
router.post('/', postRequestValidations, createUser);
router.put('/:id(\\d+)/', putRequestValidations, updateUser);
router.get('/:id(\\d+)/', getRequestValidation, getById);
router.delete('/:id(\\d+)/', deleteRequestValidations, deleteUser);




module.exports = router;