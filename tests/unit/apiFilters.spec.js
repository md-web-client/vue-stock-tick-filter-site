import { sort, search, filterCompanies/*, reject*/ } from '../../src/lib/apiFilter'
import API from '../../src/api/IEX';

describe('Filters for the Api', () => {
  let companies,tempFilter,searchKeyArray,searchText,sortKey;
  let res1,res2,res3;
  beforeAll(async () => {
    let response = await API.getComputerHardwareCompanies();
    companies = response.data;

    tempFilter = ['symbol','open', 'close'];
    searchKeyArray = ['companyName']
    searchKeyArray = ['symbol']
    searchText = ''
    sortKey = 'ascend'
    sortKey = 'none'
    sortKey = 'descend'

    const order1 = () => {
      const filteredCompanies = filterCompanies(companies, tempFilter );
      const sortedAndFiltered = sort(filteredCompanies, searchKeyArray, sortKey)
      const searchedCompanies = search(sortedAndFiltered, searchKeyArray, searchText)
      return searchedCompanies
    }
    const order2 = () => {
      const sortedAndFiltered = sort(companies, searchKeyArray, sortKey)
      const filteredCompanies = filterCompanies(sortedAndFiltered, tempFilter );
      const searchedCompanies = search(filteredCompanies, searchKeyArray, searchText)
      return searchedCompanies
    }
    const order3 = () => {
      const searchedCompanies = search(companies, searchKeyArray, searchText)
      const filteredCompanies = filterCompanies(searchedCompanies, tempFilter );
      const sortedAndFiltered = sort(filteredCompanies, searchKeyArray, sortKey)
      return sortedAndFiltered
    }
    res1 = order1();
    res2 = order2();
    res3 = order3();
  })

  xit('api sanity1', async () => {
    expect(res1[0]).toEqual({"avgTotalVolume" : 45047, "calculationPrice" : "close", "change" : -0.96, "changePercent" : -0.02816, "close" : 33.13, "closeTime" : 1561492922370, "companyName" : "China Southern Airlines Co. Ltd.", "delayedPrice" : 33.13, "delayedPriceTime" : 1561492922371, "extendedChange" : 0, "extendedChangePercent" : 0, "extendedPrice" : 33.13, "extendedPriceTime" : 1561492922373, "high" : 33.71, "iexAskPrice" : 0, "iexAskSize" : 0, "iexBidPrice" : 0, "iexBidSize" : 0, "iexLastUpdated" : 0, "iexMarketPercent" : null, "iexRealtimePrice" : 0, "iexRealtimeSize" : 0, "iexVolume" : 0, "latestPrice" : 33.13, "latestSource" : "Close", "latestTime" : "June 25, 2019", "latestUpdate" : 1561492922370, "latestVolume" : 36112, "low" : 33.13, "marketCap" : null, "open" : 33.68, "openTime" : 1561469400952, "peRatio" : 16.73, "previousClose" : 34.09, "symbol" : "ZNH", "week52High" : 52.34, "week52Low" : 25.45, "ytdChange" : 0.095069})
  })

  xit('api sanity2', async () => {
    expect(companies[0]).toEqual({"avgTotalVolume" : 27, "calculationPrice" : "close", "change" : 0, "changePercent" : 0, "close" : 6.5, "closeTime" : 1560312000000, "companyName" : "Cie Aérienne Inter Régionale Express", "delayedPrice" : null, "delayedPriceTime" : null, "extendedChange" : null, "extendedChangePercent" : null, "extendedPrice" : null, "extendedPriceTime" : null, "high" : null, "iexAskPrice" : null, "iexAskSize" : null, "iexBidPrice" : null, "iexBidSize" : null, "iexLastUpdated" : null, "iexMarketPercent" : null, "iexRealtimePrice" : null, "iexRealtimeSize" : null, "iexVolume" : null, "latestPrice" : 6.5, "latestSource" : "Close", "latestTime" : "June 12, 2019", "latestUpdate" : 1560312000000, "latestVolume" : 0, "low" : null, "marketCap" : 0, "open" : null, "openTime" : null, "peRatio" : null, "previousClose" : 6.5, "symbol" : "MLAAE-FP", "week52High" : 14.2, "week52Low" : 5, "ytdChange" : 0.203704})
  })

  xit('api sanity3', async () => {
    expect(res1).toEqual(res3)
    expect(res1).toEqual(res2)
    expect(res2).toEqual(res3)
  })

})
