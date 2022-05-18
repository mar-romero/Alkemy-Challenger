const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const movieService = require("../../services/movieService");
const { ROLES, ADMIN_ROLE } = require("../../constants");
const { validationResult } = require("../commons");
const { validJWT, hasRole } = require("../auth");
const characterService = require("../../services/characterService");


const GenderTypeRepository = require("../../repositories/genderTypeRepository");
const ContentTypeRepository = require("../../repositories/contentTypeRepository");


const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();


//const _idRequied = check("id").not().isEmpty();
//const _idIsNumeric = check("id").isNumeric();
const _idExist = check("id").custom(
  async (id = "") => {
  const movieFound = await movieService.findById(id);
  if (!movieFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});


const _creationDateIsDateAndOptional = check("creationDate").optional().isDate();
const _creationDateRequired = check("creationDate").not().isEmpty();
const _creationDateIsDate = check("creationDate").isDate();


const _titleOptional = check("title").optional();
const _titleRequired = check("title", "Title required").not().isEmpty();
const _titleNotExist = check("title").custom(async (title = "") => {
  const mFound = await movieService.findByTitle(title);
  if (mFound) {
    throw new AppError("The Title exist in DB", 400);
  }
});


const _calificationIsNumericAndOptional = check("calification").optional().isNumeric();
const _calificationRequired = check("calification").not().isEmpty();
const _calificationIsNumeric = check("calification").isNumeric();


const _contentTypeExistValidation = async (contentType = "") => {
  const contentTypeFound = await contentTypeRepository.findByDescription(contentType);
  if (!contentTypeFound) {
    throw new AppError("The content Type exist in DB", 400);
  }
};

const _genderTypeExistValidation = async (genderType = "") => {
  const genderTypeFound = await genderTypeRepository.findByDescription(genderType);
  if (!genderTypeFound) {
    throw new AppError("The gender Type exist in DB", 400);
  }
};


const _contentTypeExist = check("contentType").custom(_contentTypeExistValidation);
const _genderTypeExist = check("genderType").custom(_genderTypeExistValidation);


const _contentTypetExistAndOptional = check("contentType").optional().custom(_contentTypeExistValidation);
const _genderTypeExistAndOptional = check("genderType").optional().custom(_genderTypeExistValidation);


const _idRequied = (name)=>{
  return check(name).not().isEmpty();
}
const _idIsNumeric= (name)=>{
  return check(name).isNumeric();
}


const _idCharacterExist = check("idCharacter").custom(
  async (idCharacter = "") => {
  const cFound = await characterService.findById(idCharacter);
  if (!cFound) {
    throw new AppError("The Character id does not exist in DB", 400);
  }
});



const _idMovieExist = check("idMovie").custom(
  async (idMovie = "") => {
  const mFound = await movieService.findById(idMovie);
  if (!mFound) {
    throw new AppError("The Movie id does not exist in DB", 400);
  }
});






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
  _titleRequired,
  _titleNotExist,
  _creationDateRequired,
  _creationDateIsDate,
  _calificationRequired,
  _calificationIsNumeric,
  _contentTypeExist,
  _genderTypeExist,
  validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied('id'),
  _idIsNumeric('id'),
  _idExist,
  _titleOptional,
  _titleNotExist,
  _creationDateIsDateAndOptional,
  _calificationIsNumericAndOptional,
  _contentTypetExistAndOptional,
  _genderTypeExistAndOptional,
  validationResult
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied('id'),
  _idIsNumeric('id'),
  _idExist,
  validationResult,
];

const getAllRequestValidation = [validJWT];

const getRequestValidation = [
  validJWT,
  _idRequied('id'),
  _idIsNumeric('id'),
  _idExist,
  validationResult,
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  asociationRequestValidation
};
