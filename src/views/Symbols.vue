<template>
    <div>
      <div class="primary-heading-con">
        <div class="heading">
            <div class="title">Symbols/Tickers</div>
            <input @click="clearCompany" v-model="searchSymbolText" placeholder="Search Symbol" />
            <button @click="searchCompanyButton">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button> &nbsp;&nbsp;&nbsp;&nbsp;
            <input @click="clearSymbol" v-model="searchCompanyText" placeholder="Search Company Name" />
            <button @click="searchSymbolButton">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
            <h2>Filter Logic</h2>
            <div class="is-flex">
                <ul class="centerx">
                    <li>
                        <input type="checkbox" v-model="checkboxArray[0]" /> Symbol
                    </li>
                    <li>
                        <input type="checkbox" v-model="checkboxArray[1]" /> Open
                    </li>
                    <li>
                        <input type="checkbox" v-model="checkboxArray[2]" /> Close
                    </li>
                    <li>
                        <input type="checkbox" v-model="checkboxArray[3]" /> Primary Exchange
                    </li>
                </ul>
                <div style="display: flex; flex-direction: column; justify-content: space-between;">
                 <button @click="ascend">Ascending</button>
                 <button @click="descend">Descending</button>
                 <button @click="removeSort">Remove Sort</button>
                </div>

            </div>
        </div>
      </div>

      <div class="page-content-con">
          <loading v-if="loading"></loading>
          <div v-else>
              <div
                  v-for="company in searchedCompanies"
                  :key="company.symbol"
                  class="company"
              >
                  <h5 class="heading is-size-5">{{company.symbol}} : <small class="is-size-7">{{company.companyName}}</small></h5>
                  <div>Open <money :value="company.open"></money></div>
                  <div>Close <money :value="company.close"></money></div>
                  <timestamp :value="company.openTime"></timestamp> - <timestamp :value="company.closeTime"></timestamp>
              </div>
          </div>
      </div>

    </div>
</template>

<script>
import API from '../api/IEX';
import _ from 'underscore';


const sortCompanies = (companies, key) => {
    return _.sortBy(companies, key);
}
const sortCompaniesReverse = (companies, key) => {
    return _.sortBy(companies, key).reverse();
}
const sort = (companies, key, direction) => {
    return direction === 'ascend' ?
    sortCompanies(companies, key) :
    direction === 'descend' ?
    sortCompaniesReverse(companies, key) :
    companies;

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
const shrink = (companies) => [companies[0]]

export default {
    name : "Symbols",
    methods : {
        searchSymbolButton : function () {
            // nothing needed to be done.
        },
        searchCompanyButton : function () {
            // nothing needed to be done.
        },
        clearCompany: function () {
            this.searchKey = 'symbol'
            this.searchCompanyText = ''
        },
        clearSymbol: function () {
            this.searchKey = 'companyName'
            this.searchSymbolText = ''
        },
        ascend: function () {
            this.sortKey = 'ascend'
            this.searchedCompanies = sort(this.searchedCompanies, this.searchKey, this.sortKey)
        },
        descend: function () {
            this.sortKey = 'descend'
            this.searchedCompanies = sort(this.searchedCompanies, this.searchKey, this.sortKey)
        },
        removeSort: function () {
            this.sortKey = 'none'
            const tempFilter = ['symbol','open', 'close', 'primaryExchange'].filter( (value, index) => this.checkboxArray[index]);
            this.filteredCompanies = filterCompanies(this.companies, tempFilter );
            const sortedAndFiltered = sort(this.filteredCompanies, this.searchKey, this.sortKey)
            this.searchedCompanies = searchCompanies(sortedAndFiltered, this.searchKey, this.searchText)
        }
    },
    data () {
        return {
            value : '',
            loading : true,
            companies : [],
            searchSymbolText : '',
            searchCompanyText: '',
            searchText: '',
            finds : [],
            searchedCompanies: [],
            filteredCompanies: [],
            filterArray: [],
            searchKey: 'symbol',
            sortKey: 'none',
            checkboxArray: [false, false, false, false],
        };
    },
    watch : {
        searchSymbolText : function (searchSymbolText) {
            this.searchText = searchSymbolText;
            const sortedAndFiltered = sort(this.filteredCompanies, this.searchKey, this.sortKey)
            return this.searchedCompanies = searchCompanies(sortedAndFiltered, this.searchKey, searchSymbolText)
        },
        searchCompanyText : function (searchCompanyText) {
            this.searchText = searchCompanyText;
            const sortedAndFiltered = sort(this.filteredCompanies, this.searchKey, this.sortKey)
            return this.searchedCompanies = searchCompanies(sortedAndFiltered, this.searchKey, searchCompanyText)
        },
        checkboxArray: function (checkboxArray) {
            const tempFilter = ['symbol','open', 'close', 'primaryExchange'].filter( (value, index) => checkboxArray[index]);
            this.filteredCompanies = filterCompanies(this.companies, tempFilter );
            const sortedAndFiltered = sort(this.filteredCompanies, this.searchKey, this.sortKey)
            this.searchedCompanies = searchCompanies(sortedAndFiltered, this.searchKey, this.searchText)
        },
    },
    beforeMount () {
        API.getComputerHardwareCompanies().then(response => {
            return response.data;
        })
        .then(companies => {
            this.filteredCompanies = companies
            this.searchedCompanies = companies
            this.companies = companies
            return companies
        })
        .then(companies => {
            sortCompanies(companies)
            sortCompaniesReverse(companies)
            filterCompanies(companies, ['open', 'close'])
            return companies
        }).then(companies => {
            this.companies  = companies
        }).finally(() => {
            this.loading = false;
        });
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/css/_theme';
    .company {
        margin-bottom:10px;
        padding-bottom:10px;
        border-bottom:1px solid $white-ter;
    }
</style>
