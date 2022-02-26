import {BASE_URL_MDRS} from '../apis/BaseUrl'
import axios from 'axios'

export const editProfile = (userID, user) => {
    axios.put(`${BASE_URL_MDRS}/api/Jogadores/${userID}`, user)
        .then(response => {
            console.log(response)
            return response;
        }).catch(err => {
            return err;
        });
}