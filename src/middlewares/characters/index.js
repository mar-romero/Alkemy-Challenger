const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const characterService = require('../../services/characterService');
const { ROLES, ADMIN_ROLE } = require('../../constants');
const logger = require('../../loaders/logger');
const {validationResult} = require('../commons');
const { validJWT, hasRole } = require('../auth');
const movieService = require("../../services/movieService");

const _nameRequired = check('name', 'Name required').not().isEmpty();


const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if(!ROLES.includes(role)) {
            throw new AppError('Ivalid Role', 400);
        }
    }
);


const _idExist = check('id').custom(
    async (id = '') => {
        const characterFound = await characterService.findById(id);
        if(!characterFound) {
            throw new AppError('The id does not exist in DB', 400);
        }
    }
);

const _ageIsNumeric=check('age').isNumeric().optional();
const _weigthIsNumeric=check('weigth').isNumeric().optional();
const _historyRequired = check('history').not().isEmpty();
const _nameNotExist = check('name').custom(
    async (name = '') => {
        const cFound = await characterService.findByName(name);
        if(cFound) {
            throw new AppError('The name exist in DB', 400);
        }
    }
);


const _idMovieExist = check("idMovie").custom(
    async (idMovie = "") => {
    const mFound = await movieService.findById(idMovie);
    if (!mFound) {
      throw new AppError("The Movie id does not exist in DB", 400);
    }
  });

  const _idCharacterExist = check("idCharacter").custom(
    async (idCharacter = "") => {
    const cFound = await characterService.findById(idCharacter);
    if (!cFound) {
      throw new AppError("The Character id does not exist in DB", 400);
    }
  });

  const _idRequied = (name)=>{
    return check(name).not().isEmpty();
  }
  const _idIsNumeric= (name)=>{
    return check(name).isNumeric();
  }
const asociationRequestValidation =[
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied('idCharacter'),
    _idIsNumeric('idCharacter'),
    _idCharacterExist,
    _idRequied('idMovie'),
    _idIsNumeric('idMovie'),
    _idMovieExist,
    validationResult
  ]
  
const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _nameNotExist,
    _ageIsNumeric,
    _historyRequired,
    _weigthIsNumeric,
    validationResult
]

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied('id'),
    _nameNotExist,
    _idIsNumeric('id'),
    _idExist,
    _roleValid,
    validationResult
]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied('id'),
    _idIsNumeric('id'),
    _idExist,
    validationResult
]

const getAllRequestValidation = [
    validJWT
]

const getRequestValidation = [
    validJWT,
    _idRequied('id'),
    _idIsNumeric('id'),
    _idExist,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    asociationRequestValidation
}