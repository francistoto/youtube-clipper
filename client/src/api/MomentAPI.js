import { axiosDELETE, axiosPOST } from './utilities/fetching';

const MomentAPI = {
    createMoment: (newMoment) => {
        return axiosPOST('/moments/create', { newMoment });
    },
    likeMoment: (momentId, userId) => {

    },
    deleteMoment: (momentId, userId) => {
        return axiosDELETE('/moments/delete', { momentId, userId });
    }
};

export default MomentAPI;
