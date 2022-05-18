const MovieRepository = require("../repositories/movieRepository");
const GenderTypeRepository = require("../repositories/genderTypeRepository");
const ContentTypeRepository = require("../repositories/contentTypeRepository");
const CharacterRepository = require("../repositories/characterRepository");

const characterRepository = new CharacterRepository();
const repository = new MovieRepository();
const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();

const findById = async (id) => {
  return await repository. findByIdWithCharacter(id);
};

const findByTitle = async (title) => {
  return await repository.findByTitle(title);
};


const findAll = async (filter, options) => {

  return await repository.findAll(filter, options);
};

const save = async (m) => {
  const genderType = await genderTypeRepository.findByDescription(m.genderType);
  const contentType = await contentTypeRepository.findByDescription(m.contentType);
  m.genderTypeId = genderType.id;
  m.contentTypeId = contentType.id;
  return await repository.save(m);
};

const update = async (id, m) => {
  if (m.genderType) {
    const genderType = await genderTypeRepository.findByDescription(m.genderType);
    m.genderTypeId = genderType.id;
  }
  if (m.contentType) {
    const contentType = await contentTypeRepository.findByDescription(m.contentType);
    m.contentTypeId = contentType.id;
  }
  return await repository.update(id, m);
};

const remove = async (id) => {
  return await repository.remove(id);
};

const associate = async (idMovie, idCharacter)=>{
  const movie = await repository.findById(idMovie);
  const character = await characterRepository.findById(idCharacter);
  await movie.addCharacter(character);

}

module.exports = {
  findById,
  findByTitle,
  findAll,
  save,
  update,
  remove,
  associate,
};
