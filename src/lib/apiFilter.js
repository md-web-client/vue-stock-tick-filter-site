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
const search = (companies, keyArr, query) => {
    if (!query){return companies}
    return _.filter(companies,
        (obj) => {
            const result = keyArr.filter(key => (
                obj[key].toLowerCase().includes(query.toLowerCase())
            ))
            return result.length > 0
        }
    )
}
const filterCompanies = (companies, keyArr) => {
    return _.filter(companies,
        (obj) => {
            const result = keyArr.filter(key => (
                obj[key] ? true : false
            ))
            return result.length === keyArr.length
        }
    )
}
const reject = (companies, list) => {
    return _.reject(companies, (company) => { return list.includes(company.symbol); })
}
export { sort, search, filterCompanies, reject }
