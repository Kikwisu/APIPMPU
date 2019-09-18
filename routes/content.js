const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Content = new Schema({
    category: String,
    communities: [{
        profession: String,
        title: String,
        body: String,
        img: String,
        projects: [
            {
                name: String,
                text: String,
                img: String
            }
        ],
        contacts: {
            img: String,
            text: String
        }
    }]
    
});

module.exports = mongoose.model('Content', Content);

