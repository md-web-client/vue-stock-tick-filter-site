import { sort, searchCompanies, filterCompanies, reject } from '../../src/lib/apiFilter'
import API from '../../src/api/IEX';
import { notDeepEqual } from 'assert';


describe('Filters for the Api', () => {
  let companies,tempFilter,searchKey,searchText,sortKey;
  let res1,res2,res3;
  beforeAll(async () => {
    // future notes
    // mock the data sanity test the api?
    // 10 companies
    let response = await API.getComputerHardwareCompanies();
    companies = response.data;

    tempFilter = ['symbol','open', 'close'];
    searchKey = 'companyName'
      searchKey = 'symbol'
    searchText = ''
    sortKey = 'ascend'
      sortKey = 'none'
      sortKey = 'descend'

    const order1 = () => {
      const filteredCompanies = filterCompanies(companies, tempFilter );
      const sortedAndFiltered = sort(filteredCompanies, searchKey, sortKey)
      const searchedCompanies = searchCompanies(sortedAndFiltered, searchKey, searchText)
      return searchedCompanies
    }
    const order2 = () => {
      const sortedAndFiltered = sort(companies, searchKey, sortKey)
      const filteredCompanies = filterCompanies(sortedAndFiltered, tempFilter );
      const searchedCompanies = searchCompanies(filteredCompanies, searchKey, searchText)
      return searchedCompanies
    }
    const order3 = () => {
      const searchedCompanies = searchCompanies(companies, searchKey, searchText)
      const filteredCompanies = filterCompanies(searchedCompanies, tempFilter );
      const sortedAndFiltered = sort(filteredCompanies, searchKey, sortKey)
      return sortedAndFiltered
    }
    res1 = order1();
    res2 = order2();
    res3 = order3();
  })

  it('sort', () => {
    const sort0 = sort(companies, 'companyName', 'descend')
    const sort1 = sort(companies, 'symbol', 'descend')
    const sort2 = sort(companies, 'companyName', 'ascend')
    const sort3 = sort(companies, 'symbol', 'none')
    const sort4 = sort(companies, 'symbol', 'failsafe')
    expect(
      'hi'
    ).toEqual('hi')
  })

  it('searchCompanies', () => {
    const search1 = searchCompanies(companies, 'symbol', '')
    const search2 = searchCompanies(companies, 'companyName', '')
    const search3 = searchCompanies(companies, 'companyName', 'Al')
    expect(
      'hi'
    ).toEqual('hi')
  })

  it('filterCompanies', () => {
    const filter = filterCompanies(companies, ['symbol','open', 'close'] )
    expect(
      'hi'
    ).toEqual('hi')
  })

  it('reject', async () => {
    const oneLess = reject(companies, ['BLTA'])
    expect(
      oneLess
    ).not.toEqual(companies)
    expect(
      oneLess.length
    ).toEqual(154)
    expect(
      companies.length
    ).toEqual(155)
  })

  it('sanity1', async () => {
    expect(res1[0]).toEqual({"avgTotalVolume": 45047, "calculationPrice": "close", "change": -0.96, "changePercent": -0.02816, "close": 33.13, "closeTime": 1561492922370, "companyName": "China Southern Airlines Co. Ltd.", "delayedPrice": 33.13, "delayedPriceTime": 1561492922371, "extendedChange": 0, "extendedChangePercent": 0, "extendedPrice": 33.13, "extendedPriceTime": 1561492922373, "high": 33.71, "iexAskPrice": 0, "iexAskSize": 0, "iexBidPrice": 0, "iexBidSize": 0, "iexLastUpdated": 0, "iexMarketPercent": null, "iexRealtimePrice": 0, "iexRealtimeSize": 0, "iexVolume": 0, "latestPrice": 33.13, "latestSource": "Close", "latestTime": "June 25, 2019", "latestUpdate": 1561492922370, "latestVolume": 36112, "low": 33.13, "marketCap": null, "open": 33.68, "openTime": 1561469400952, "peRatio": 16.73, "previousClose": 34.09, "symbol": "ZNH", "week52High": 52.34, "week52Low": 25.45, "ytdChange": 0.095069})
  })

  it('sanity2', async () => {
    expect(companies[0]).toEqual({"avgTotalVolume": 27, "calculationPrice": "close", "change": 0, "changePercent": 0, "close": 6.5, "closeTime": 1560312000000, "companyName": "Cie Aérienne Inter Régionale Express", "delayedPrice": null, "delayedPriceTime": null, "extendedChange": null, "extendedChangePercent": null, "extendedPrice": null, "extendedPriceTime": null, "high": null, "iexAskPrice": null, "iexAskSize": null, "iexBidPrice": null, "iexBidSize": null, "iexLastUpdated": null, "iexMarketPercent": null, "iexRealtimePrice": null, "iexRealtimeSize": null, "iexVolume": null, "latestPrice": 6.5, "latestSource": "Close", "latestTime": "June 12, 2019", "latestUpdate": 1560312000000, "latestVolume": 0, "low": null, "marketCap": 0, "open": null, "openTime": null, "peRatio": null, "previousClose": 6.5, "symbol": "MLAAE-FP", "week52High": 14.2, "week52Low": 5, "ytdChange": 0.203704})
  })

  it('sanity3', async () => {
    expect(res1).toEqual(res3)
    expect(res1).toEqual(res2)
    expect(res2).toEqual(res3)
  })

})
