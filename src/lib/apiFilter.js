import _ from 'underscore';
const sortCompanies = (companies, key) => {
    return _.sortBy(companies, key);
}
const sortCompaniesReverse = (companies, key) => {
    return _.sortBy(companies, key).reverse();
}
const sort = (companies, key, direction) => {
    return direction === 'ascend'
        ? sortCompanies(companies, key)
        : direction === 'descend'
            ? sortCompaniesReverse(companies, key)
            : companies;

}
const searchCompanies = (companies, key, query) => {
    if (!query){return companies}
    return _.filter(companies,
        (obj) => {
            // return obj[key].includes(query)
            return obj[key].toLowerCase().includes(query.toLowerCase())
        }
    )
}
const filterCompanies = (companies, prefix) => {
    return _.filter(companies,
        (obj) => {
            for(let count = 0; count < prefix.length; count++){
                const key = prefix[count]
                const valueExists = obj[key] ? true : false
                if(valueExists) {
                    continue;
                }
                else {
                    return false
                }
            }
            return true
        }
    )
}
const reject = (companies, list) => {
    return _.reject(companies, (company) => { return list.includes(company.symbol); })
}
export { sort, searchCompanies, filterCompanies, reject }
