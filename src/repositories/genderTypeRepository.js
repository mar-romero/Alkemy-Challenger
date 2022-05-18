const GenderType = require('../models/genderTypes');

class GenderTypeRepository {

    constructor(){

    }

    async findById(id) {
        return await GenderType.findByPk(id);
    }
    
    async findByDescription(description) {
        return await GenderType.findOne({ where: { description } });
    }
}


module.exports = GenderTypeRepository;