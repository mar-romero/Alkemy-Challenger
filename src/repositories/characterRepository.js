const Character = require('../models/characters');
const { Op } = require("sequelize");
const Movie = require("../models/movies");


class CharacterRepository {

    constructor(){

    }

    async findAll({ name, age,weigth,movieTitle}, {limit,offset,order}) {
        let where = {};
        if (name) {
          where.name = {
            [Op.like]: `%${name}%`,
          };
        }
        if (age) {
          where.age = {
            [Op.eq]: age,
          };
        }
        if (weigth) {
            where.weigth = {
              [Op.eq]: weigth,
            };
          }

        return await Character.findAll({where});
      }

      
    async findById(id) {
        return await Character.findByPk(id);
    }
    async findByIdWithMovie(id) {
      return await Character.findByPk(id, {
        include: [
          "movies",
        ],
        attributes: ['id',"name", "image", "age",'weigth'],
        
      });
    }
    
    async findByName(name) {
        return await Character.findOne({ where: { name } });
    }

    async save(c) {
        return await Character.create(c);
    }

    async update(id, c){
        return await Character.update(c, {
            where:{
                id
            }
        });
    }



    async remove(id) {
        return await Character.destroy({
            where:{
                id
            }
        });
    }
}


module.exports = CharacterRepository;