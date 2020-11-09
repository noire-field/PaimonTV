import axios from 'axios';

import Config from './../../PaimonTV.config.json';

export default axios.create({
    baseURL: `${Config.FIREBASE.URL}/${Config.FIREBASE.USER}`
});