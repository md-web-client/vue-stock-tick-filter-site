<template>
    <div>
      <div class="primary-heading-con">
        <div class="heading">
            <div class="title">Symbols/Tickers</div>
            <input v-model="searchText" placeholder="Search" />
            <button @click="searchButton">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
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
                    console.log({key, valueExists, symbol : obj.symbol})
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
        searchButton : function (searchText) {
            return this.companies = searchCompanies(this.companies, 'companyName', searchText)
        }
    },
    data () {
        return {
            value : '',
            loading : true,
            companies : [],
            searchText : '',
            finds : [],
            searchedCompanies: [],
        };
    },
    watch : {
        searchText : function (searchText) {
            return this.searchedCompanies = searchCompanies(this.companies, 'companyName', searchText)
        }
    },
    beforeMount () {
        API.getComputerHardwareCompanies().then(response => {
            return response.data;
        })
        .then(companies => {
            this.searchedCompanies = companies
            return companies
        })
        .then(companies => {
            sortCompanies(companies)
            sortCompaniesReverse(companies)
            searchCompanies(companies, 'companyName', 'Al')
            return filterCompanies(companies, ['open', 'close'])
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
