import apiCreator from './util/ApiCreator';

const api = apiCreator('https://cloud.iexapis.com/stable');


const token = 'sk_ab3b92699bb844e584c7108ffb977047';
const collection = 'Airlines';

export default {
    getCompanies () {
        return api.get(`/stock/market/collection/tag?collectionName=${collection}&token=${token}`);
    },
}
