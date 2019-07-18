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
    const resultCompanies = _.filter(companies,
        (company) => {
            const result = keyArr.filter(key => (
                company[key].toLowerCase().includes(query.toLowerCase())
            ))
            return result.length > 0
        }
    );
    return resultCompanies;
};

const filterCompanies = (companies, keyArr) => {
    const resultCompanies = _.filter(companies,
        (company) => {
            const result = keyArr.filter(key => (
                company[key] ? true : false
            ))
            return result.length === keyArr.length
        }
    );
    return resultCompanies;
};


const reject = (companies, stringList, key) => {
    return _.reject(companies, (company) => {
        return stringList.includes(company[key]);
    })
}

export { sort, search, filterCompanies, reject }
