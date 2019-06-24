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

const sortCompaniesReverse = (companies) => {
    return _.sortBy(companies, 'symbol').reverse();
}
const sortCompanies = (companies) => {
    return _.sortBy(companies, 'symbol');
}
const searchCompanies = (companies, key, query) => {
    if (!query){return companies}
    return _.filter(companies,
        (obj) => {
            return obj[key].includes(query)
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
            checkboxArray: [false, false, false, false],
        };
    },
    watch : {
        searchSymbolText : function (searchSymbolText) {
            this.searchText = searchSymbolText;
            return this.searchedCompanies = searchCompanies(this.filteredCompanies, this.searchKey, searchSymbolText)
        },
        searchCompanyText : function (searchCompanyText) {
            this.searchText = searchCompanyText;
            return this.searchedCompanies = searchCompanies(this.filteredCompanies, this.searchKey, searchCompanyText)
        },
        checkboxArray: function (checkboxArray) {
            const tempFilter = ['symbol','open', 'close', 'primaryExchange'].filter( (value, index) => checkboxArray[index]);
            this.filteredCompanies = filterCompanies(this.companies, tempFilter );
            this.searchedCompanies = searchCompanies(this.filteredCompanies, this.searchKey, this.searchText)
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
