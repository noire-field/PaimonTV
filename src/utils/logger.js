import axios from './axios';

module.exports = {
    Debug,
    Error
};

function Debug(message) {
    //console.log(message);
}

function Error(message, error) {
    axios.post('/errors.json', {
        message,
        error
    }).then(({ data }) => {
        
    }).catch((error) => {
        
    });

    //console.log(message);
    //console.log(error);
}