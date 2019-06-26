import apiCreator from './util/ApiCreator';

const api = apiCreator('https://cloud.iexapis.com/stable');

export default {
    getComputerHardwareCompanies () {
        return api.get('/stock/market/collection/tag?collectionName=Airlines&token=sk_ab3b92699bb844e584c7108ffb977047');
    },
}
