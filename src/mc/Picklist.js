import axios from 'axios';
import * as Common from './Common';


export const fetchSearchPicklist = (searchString) => {
    var obj = {
        sid: sessionStorage.getItem('sessionId'),
        type: 'individualList',
        srch: searchString
    };
    var result = axios.create({
        baseURL: Common.apiPicklist,
        headers: {},
    }).get('?1=' + JSON.stringify(obj)).then(result => {
        return JSON.parse(result.data);
    });

    return result;
}
export const handleInputChange = (value) => {
    // setInputValue(value);
}