<template>
    <div>
      <div class="primary-heading-con">
        <div class="heading">
            <div class="title">Symbols/ Tickers</div>
            <input v-model="searchText" placeholder="Search Tick/Company" />
            <button @click="searchButton">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button> &nbsp;&nbsp;&nbsp;&nbsp;
            <br/><br/>
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
          <div v-else style="display: flex;flex-wrap: wrap;padding-left: 10px;padding-right: 10px;">
              <div
                  v-for="company in searchedCompanies"
                  :key="company.symbol"
                  class="company"
                  style="padding-right: 30px;width: 374.45px;"
              >
                  <h5 class="heading is-size-5"><a v-bind:href="'https://www.google.com/search?q='+company.companyName+' stock'">{{company.symbol}}</a> : <small class="is-size-7">{{company.companyName}}</small></h5>
                  <div>Open <money :value="company.open"></money></div>
                  <div>Close <money :value="company.close"></money></div>
                  <timestamp :value="company.openTime"></timestamp> - <timestamp :value="company.closeTime"></timestamp>
                  <button v-bind:value="company.symbol" @click="exclude">exclude</button>

              </div>
          </div>
      </div>

    </div>
</template>

<script>
import API from '../api/IEX';
import { sort, search, filterCompanies, reject } from '../lib/apiFilter'
console.log({search})
export default {
    name : "Symbols",
    methods : {
        searchButton : function () {},
        ascend : function () {
            this.sortKey = 'ascend'
            this.searchedCompanies = sort(this.searchedCompanies, this.searchKey, this.sortKey)
        },
        descend : function () {
            this.sortKey = 'descend'
            this.searchedCompanies = sort(this.searchedCompanies, this.searchKey, this.sortKey)
        },
        removeSort : function () {
            this.sortKey = 'none'
            const tempFilter = ['symbol','open', 'close', 'primaryExchange'].filter( (value, index) => this.checkboxArray[index]);
            this.filteredCompanies = filterCompanies(this.companies, tempFilter );
            const sortedAndFiltered = sort(this.filteredCompanies, this.searchKey, this.sortKey)
            this.searchedCompanies = search(sortedAndFiltered, this.searchKey, this.searchText)
        },
        exclude : function (event) {
            this.excludeTickers.push(event.target.value)
        }
    },
    data () {
        return {
            excludeTickers : [],
            value : '',
            loading : true,
            companies : [],
            searchSymbolText : '',
            searchCompanyText : '',
            searchText : '',
            finds : [],
            searchedCompanies : [],
            filteredCompanies : [],
            filterArray : [],
            searchKey : ['symbol', 'companyName'],
            sortKey : 'none',
            checkboxArray : [false, false, false, false],
        };
    },
    watch : {
        searchText : function (searchText) {
            this.searchText = searchText;
            const sortedAndFiltered = sort(this.filteredCompanies, this.searchKey, this.sortKey)
            this.searchedCompanies = search(sortedAndFiltered, this.searchKey, searchText)
            return this.searchedCompanies = reject(this.searchedCompanies, this.excludeTickers)
        },
        checkboxArray : function (checkboxArray) {
            const tempFilter = ['symbol','open', 'close', 'primaryExchange'].filter( (value, index) => checkboxArray[index]);
            this.filteredCompanies = filterCompanies(this.companies, tempFilter );
            const sortedAndFiltered = sort(this.filteredCompanies, this.searchKey, this.sortKey)
            this.searchedCompanies = search(sortedAndFiltered, this.searchKey, this.searchText)
        },
        excludeTickers : function () {
            this.companies = reject(this.companies, this.excludeTickers)
            this.searchedCompanies = reject(this.searchedCompanies, this.excludeTickers)
        }
    },
    beforeMount () {
        API.getComputerHardwareCompanies().then(response => {
            return response.data;
        }).then(companies => {
            this.filteredCompanies = companies
            this.searchedCompanies = companies
            this.searchedCompanies = reject(this.searchedCompanies, this.excludeTickers)
            this.companies = companies
            return companies
        }).then(companies => {
            return companies
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
