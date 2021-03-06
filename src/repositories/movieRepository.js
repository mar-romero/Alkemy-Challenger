const Movie = require("../models/movies");
const GenderType = require("../models/genderTypes");
const { parseISO } = require("date-fns");
const sequelize = require("../loaders/sequelize");
const { Op } = require("sequelize");
const Character = require("../models/characters");


class MovieRepository {
  constructor() {}

  async findAll(
    { title, calification, creationDate },
    { limit, offset, order }
  ) {
    let where = {};
    if (title) {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (calification) {
      where.calification = {
        [Op.eq]: calification,
      };
    }
    if (creationDate) {
      creationDate = parseISO(creationDate);
      creationDate.setHours(-3);
      where.creationDate = {
        [Op.eq]: creationDate,
      };
    }
    let config = {
      where,
      atributes: ["title", "image", "creationDate"],
    };
    if (order) {
      config.order = [order.split(";")];
    }
    return await Movie.findAll(config);
  }

  async findById(id) {
    return await Movie.findByPk(id);
  }
  async findByIdWithCharacter(id) {
    return await Movie.findByPk(id, {
      include: [
        "character",
        'gender',
        'content'
      ],
      attributes: ['id',"title", "image", "creationDate",'calification'],
    });
  }
  async findByTitle(title) {
    return await Movie.findOne({ where: { title } });
  }

  async save(m) {
    return await Movie.create(m);
  }

  async update(id, m) {
    return await Movie.update(m, {
      where: {
        id,
      },
    });
  }

  async remove(id) {
    return await Movie.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = MovieRepository;
