import _ from 'underscore';

const sortCompanies = (companies, key) => {
    return _.sortBy(companies, key);
    // companies.sort(a, b => a[key] - b[key])
}

const sortCompaniesReverse = (companies, key) => {
    return _.sortBy(companies, key).reverse();
    // companies.sort(a, b => b[key] - a[key])
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
    return companies.filter( company => {
        const result = keyArr.filter(key => (
            obj[key].toLowerCase().includes(query.toLowerCase())
        ));
        return result.length > 0;
//      return orLogic(companiesWithKeys.length, keyArr.length)
    }
}

const filterCompanies = (companies, keyArr) => {
    return companies.filter(
        (company) => {
            const companiesWithKeys = keyArr.filter(key =>
                    company[key] ? true : false
                  )
            return companiesWithKeys.length === keyArr.length;
//          return andLogic(companiesWithKeys.length, keyArr.length)
        }
    )
};

const reject = (companies, stringList) => {
    return _.reject(companies, (company) => {
        return stringList.includes(company.symbol);
    });
// return companies.filter(company => !stringList.includes(company.symbol) );
}

export { sort, search, filterCompanies, reject }
