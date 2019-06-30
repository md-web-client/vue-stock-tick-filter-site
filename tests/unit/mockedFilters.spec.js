import { sort, search, filterCompanies, reject } from '../../src/lib/apiFilter'

describe('Filters for mocked data of the Api', () => {
    let tenCompanies = [
        {"symbol" : "MLAAE-FP","companyName" : "Cie Aérienne Inter Régionale Express","calculationPrice" : "close","open" : null,"openTime" : null,"close" : 6.5,"closeTime" : 1560312000000,"high" : null,"low" : null,"latestPrice" : 6.5,"latestSource" : "Close","latestTime" : "June 12, 2019","latestUpdate" : 1560312000000,"latestVolume" : 0,"iexRealtimePrice" : null,"iexRealtimeSize" : null,"iexLastUpdated" : null,"delayedPrice" : null,"delayedPriceTime" : null,"extendedPrice" : null,"extendedChange" : null,"extendedChangePercent" : null,"extendedPriceTime" : null,"previousClose" : 6.5,"change" : 0,"changePercent" : 0,"iexMarketPercent" : null,"iexVolume" : null,"avgTotalVolume" : 27,"iexBidPrice" : null,"iexBidSize" : null,"iexAskPrice" : null,"iexAskSize" : null,"marketCap" : 0,"peRatio" : null,"week52High" : 14.2,"week52Low" : 5,"ytdChange" : 0.203704},
        {"symbol" : "WJA-CT","companyName" : "WestJet Airlines Ltd.","calculationPrice" : "close","open" : null,"openTime" : null,"close" : 30.08,"closeTime" : 1560312000000,"high" : null,"low" : null,"latestPrice" : 30.08,"latestSource" : "Close","latestTime" : "June 12, 2019","latestUpdate" : 1560312000000,"latestVolume" : 0,"iexRealtimePrice" : null,"iexRealtimeSize" : null,"iexLastUpdated" : null,"delayedPrice" : null,"delayedPriceTime" : null,"extendedPrice" : null,"extendedChange" : null,"extendedChangePercent" : null,"extendedPriceTime" : null,"previousClose" : 30.03,"change" : 0.05,"changePercent" : 0.00167,"iexMarketPercent" : null,"iexVolume" : null,"avgTotalVolume" : 1037741,"iexBidPrice" : null,"iexBidSize" : null,"iexAskPrice" : null,"iexAskSize" : null,"marketCap" : 0,"peRatio" : null,"week52High" : 30.25,"week52Low" : 16.71,"ytdChange" : 0.6718529999999999},
        {"symbol" : "VBHLF","companyName" : "Virgin Australia Holdings Ltd.","calculationPrice" : "previousclose","open" : null,"openTime" : null,"close" : null,"closeTime" : null,"high" : null,"low" : null,"latestPrice" : 0.121,"latestSource" : "Previous close","latestTime" : "June 24, 2019","latestUpdate" : 1561348800000,"latestVolume" : 0,"iexRealtimePrice" : null,"iexRealtimeSize" : null,"iexLastUpdated" : null,"delayedPrice" : null,"delayedPriceTime" : null,"extendedPrice" : null,"extendedChange" : null,"extendedChangePercent" : null,"extendedPriceTime" : null,"previousClose" : 0.121,"change" : 0,"changePercent" : 0,"iexMarketPercent" : null,"iexVolume" : null,"avgTotalVolume" : 641,"iexBidPrice" : null,"iexBidSize" : null,"iexAskPrice" : null,"iexAskSize" : null,"marketCap" : 1021460220,"peRatio" : -2.12,"week52High" : 0.173,"week52Low" : 0.1189,"ytdChange" : -0.058366},
        {"symbol" : "UAL","companyName" : "United Continental Holdings, Inc.","calculationPrice" : "close","open" : 86.63,"openTime" : 1561469400437,"close" : 85.06,"closeTime" : 1561492800252,"high" : 87.23,"low" : 84.81,"latestPrice" : 85.06,"latestSource" : "Close","latestTime" : "June 25, 2019","latestUpdate" : 1561492800252,"latestVolume" : 2482088,"iexRealtimePrice" : 85.08,"iexRealtimeSize" : 100,"iexLastUpdated" : 1561492783943,"delayedPrice" : 85.06,"delayedPriceTime" : 1561492800252,"extendedPrice" : 85.14,"extendedChange" : 0.08,"extendedChangePercent" : 0.00094,"extendedPriceTime" : 1561506003980,"previousClose" : 86.55,"change" : -1.49,"changePercent" : -0.01722,"iexMarketPercent" : 0.03075555741778696,"iexVolume" : 76338,"avgTotalVolume" : 2291895,"iexBidPrice" : 0,"iexBidSize" : 0,"iexAskPrice" : 0,"iexAskSize" : 0,"marketCap" : 22381752740,"peRatio" : 10.17,"week52High" : 97.85,"week52Low" : 67.94,"ytdChange" : 0.010934},
        {"symbol" : "UAUAP","companyName" : "United Continental Holdings, Inc.","calculationPrice" : "previousclose","open" : null,"openTime" : null,"close" : null,"closeTime" : null,"high" : null,"low" : null,"latestPrice" : null,"latestSource" : "N/A","latestTime" : "N/A","latestUpdate" : null,"latestVolume" : 0,"iexRealtimePrice" : null,"iexRealtimeSize" : null,"iexLastUpdated" : null,"delayedPrice" : null,"delayedPriceTime" : null,"extendedPrice" : null,"extendedChange" : null,"extendedChangePercent" : null,"extendedPriceTime" : null,"previousClose" : null,"change" : null,"changePercent" : null,"iexMarketPercent" : null,"iexVolume" : null,"avgTotalVolume" : null,"iexBidPrice" : null,"iexBidSize" : null,"iexAskPrice" : null,"iexAskSize" : null,"marketCap" : null,"peRatio" : null,"week52High" : 0,"week52Low" : 0,"ytdChange" : 0},
        {"symbol" : "UAL-MM","companyName" : "United Continental Holdings, Inc.","calculationPrice" : "close","open" : null,"openTime" : null,"close" : 1599,"closeTime" : 1560312000000,"high" : null,"low" : null,"latestPrice" : 1599,"latestSource" : "Close","latestTime" : "June 12, 2019","latestUpdate" : 1560312000000,"latestVolume" : 0,"iexRealtimePrice" : null,"iexRealtimeSize" : null,"iexLastUpdated" : null,"delayedPrice" : null,"delayedPriceTime" : null,"extendedPrice" : null,"extendedChange" : null,"extendedChangePercent" : null,"extendedPriceTime" : null,"previousClose" : 1616,"change" : -17,"changePercent" : -0.01052,"iexMarketPercent" : null,"iexVolume" : null,"avgTotalVolume" : 367,"iexBidPrice" : null,"iexBidSize" : null,"iexAskPrice" : null,"iexAskSize" : null,"marketCap" : 0,"peRatio" : null,"week52High" : 1955,"week52Low" : 1290,"ytdChange" : -0.038484},
        {"symbol" : "UTARF","companyName" : "UTair Aviation PJSC","calculationPrice" : "previousclose","open" : null,"openTime" : null,"close" : null,"closeTime" : null,"high" : null,"low" : null,"latestPrice" : null,"latestSource" : "N/A","latestTime" : "N/A","latestUpdate" : null,"latestVolume" : 0,"iexRealtimePrice" : null,"iexRealtimeSize" : null,"iexLastUpdated" : null,"delayedPrice" : null,"delayedPriceTime" : null,"extendedPrice" : null,"extendedChange" : null,"extendedChangePercent" : null,"extendedPriceTime" : null,"previousClose" : null,"change" : null,"changePercent" : null,"iexMarketPercent" : null,"iexVolume" : null,"avgTotalVolume" : null,"iexBidPrice" : null,"iexBidSize" : null,"iexAskPrice" : null,"iexAskSize" : null,"marketCap" : null,"peRatio" : null,"week52High" : 0,"week52Low" : 0,"ytdChange" : 0},
        {"symbol" : "091810-KP","companyName" : "Tway Air Co., Ltd.","calculationPrice" : "close","open" : null,"openTime" : null,"close" : 7030,"closeTime" : 1560312000000,"high" : null,"low" : null,"latestPrice" : 7030,"latestSource" : "Close","latestTime" : "June 12, 2019","latestUpdate" : 1560312000000,"latestVolume" : 0,"iexRealtimePrice" : null,"iexRealtimeSize" : null,"iexLastUpdated" : null,"delayedPrice" : null,"delayedPriceTime" : null,"extendedPrice" : null,"extendedChange" : null,"extendedChangePercent" : null,"extendedPriceTime" : null,"previousClose" : 6970,"change" : 60,"changePercent" : 0.00861,"iexMarketPercent" : null,"iexVolume" : null,"avgTotalVolume" : 229524,"iexBidPrice" : null,"iexBidSize" : null,"iexAskPrice" : null,"iexAskSize" : null,"marketCap" : 0,"peRatio" : null,"week52High" : 12250,"week52Low" : 6400,"ytdChange" : -0.036227},
        {"symbol" : "TKHVF","companyName" : "Turk Hava Yollari AO","calculationPrice" : "previousclose","open" : null,"openTime" : null,"close" : null,"closeTime" : null,"high" : null,"low" : null,"latestPrice" : 2.75,"latestSource" : "Previous close","latestTime" : "December 31, 2018","latestUpdate" : 1546232400000,"latestVolume" : 0,"iexRealtimePrice" : null,"iexRealtimeSize" : null,"iexLastUpdated" : null,"delayedPrice" : null,"delayedPriceTime" : null,"extendedPrice" : null,"extendedChange" : null,"extendedChangePercent" : null,"extendedPriceTime" : null,"previousClose" : 2.75,"change" : 0,"changePercent" : 0,"iexMarketPercent" : null,"iexVolume" : null,"avgTotalVolume" : 0,"iexBidPrice" : null,"iexBidSize" : null,"iexAskPrice" : null,"iexAskSize" : null,"marketCap" : 3795000000,"peRatio" : 6.78,"week52High" : 2.75,"week52Low" : 2.6,"ytdChange" : 0},
        {"symbol" : "TKHVY","companyName" : "Turk Hava Yollari AO","calculationPrice" : "previousclose","open" : null,"openTime" : null,"close" : null,"closeTime" : null,"high" : null,"low" : null,"latestPrice" : 21.86,"latestSource" : "Previous close","latestTime" : "June 24, 2019","latestUpdate" : 1561348800000,"latestVolume" : 0,"iexRealtimePrice" : null,"iexRealtimeSize" : null,"iexLastUpdated" : null,"delayedPrice" : null,"delayedPriceTime" : null,"extendedPrice" : null,"extendedChange" : null,"extendedChangePercent" : null,"extendedPriceTime" : null,"previousClose" : 21.86,"change" : 0,"changePercent" : 0,"iexMarketPercent" : null,"iexVolume" : null,"avgTotalVolume" : 103,"iexBidPrice" : null,"iexBidSize" : null,"iexAskPrice" : null,"iexAskSize" : null,"marketCap" : null,"peRatio" : null,"week52High" : 35.78,"week52Low" : 19.1,"ytdChange" : -0.251882}
    ]

    it('sort', () => {
        const sort0 = sort(tenCompanies, 'companyName', 'descend')
        const sort1 = sort(tenCompanies, 'symbol', 'descend')
        const sort2 = sort(tenCompanies, 'companyName', 'ascend')
        const sort3 = sort(tenCompanies, 'symbol', 'none')
        const sort4 = sort(tenCompanies, 'symbol', 'failsafe')
        expect(sort0).not.toEqual(sort1)
        expect(sort0).not.toEqual(sort2)
        expect(sort0).not.toEqual(sort3)
        expect(sort3).toEqual(sort4)
    })

    it('searchCompanies', () => {
        const search0 = search(tenCompanies, ['symbol'], '')
        const search1 = search(tenCompanies, ['symbol'], 'TKHV')
        const search2 = search(tenCompanies, ['companyName'], '')
        const search3 = search(tenCompanies, ['companyName'], 'U')

        expect(search0).toEqual(search2)
        expect(search1).not.toEqual(search3)

        expect(search0).not.toEqual(search1)
        expect(search0).not.toEqual(search3)
        expect(search2).not.toEqual(search3)
    })

    it('filterCompanies', () => {
        const filter = filterCompanies(tenCompanies, ['symbol','open', 'close'] )
        expect(
            filter
        ).not.toEqual(tenCompanies)
        expect(
            filter.length
        ).toEqual(1)
        expect(
            tenCompanies.length
        ).toEqual(10)
    })

    it('reject', async () => {
        const oneLess = reject(tenCompanies, ['TKHVY'])
        expect(
            oneLess
        ).not.toEqual(tenCompanies)
        expect(
            oneLess.length
        ).toEqual(9)
        expect(
            tenCompanies.length
        ).toEqual(10)
    })

})
