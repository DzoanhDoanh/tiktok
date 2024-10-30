import * as httpRequest from '../utils/httpRequest';
export const suggest = async () => {
    try {
        const res = await httpRequest.get('users/suggested');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
