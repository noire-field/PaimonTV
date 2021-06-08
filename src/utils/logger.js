import axios from './axios';
import config from './../../PaimonTV.config.json'

module.exports = {
    Debug,
    Error
};

function Debug(message) {
    if(!config.DEBUG) return;
    console.log(message);
}

function Error(message, error) {
    axios.post('/errors.json', {
        message,
        error
    }).then(({ data }) => {
        
    }).catch((error) => {
        
    });

    if(config.DEBUG) {
        console.log(message);
        console.log(error);
    }
}