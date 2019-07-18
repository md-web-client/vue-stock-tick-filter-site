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
  const resultCompanies = companies.filter(
    ( company ) => {
      const keysFoundForCompany = keyArr.filter(key => (
        company[key].toLowerCase().includes(query.toLowerCase())
      ));
      return keysFoundForCompany.length > 0
      // return orLogic(keysFoundForCompany.length, keyArr.length)
    });
  return resultCompanies;
};

const filterCompanies = (companies, keyArr) => {
  const resultCompanies = companies.filter(
    (company) => {
      const keysFoundForCompany = keyArr.filter(key => (
        company[key] ? true : false
      ))
      return keysFoundForCompany.length === keyArr.length
      // return andLogic(keysFoundForCompany.length, keyArr.length)
    }
  );
  return resultCompanies;
};

const reject = (companies, stringList, key) => {
  return _.reject(companies, (company) => {
    return stringList.includes(company[key]);
  })
} // return companies.filter(company => !stringList.includes(company.symbol) );

export { sort, search, filterCompanies, reject }
