const CharacterRepository = require('../repositories/characterRepository');

const logger = require('../loaders/logger');
const MovieRepository = require("../repositories/movieRepository");

const repository = new CharacterRepository();
const movieRepository = new MovieRepository();


const findById = async(id) => {
    return await repository.findByIdWithMovie(id);
}

const findByName = async(name) => {
    return await repository.findByName(name);
}




const findAll = async(filter, options) => {
    return await repository.findAll(filter, options);
}



const save = async(c) => {
    return await repository.save(c);
}


const update = async(id, c) => {
    return await repository.update(id, c);
}

const remove = async(id) => {
    return await repository.remove(id);
}

const associate = async (idMovie, idCharacter)=>{
    const character = await repository.findById(idCharacter);
    const movie = await movieRepository.findById(idMovie);
    await character.addMovie(movie);
  
  }
  
module.exports = {
    findById,
    findByName,
    findAll,
    save,
    update,
    remove,
    associate
}