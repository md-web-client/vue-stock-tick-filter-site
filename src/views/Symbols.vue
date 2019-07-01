<template>
    <div>
      <div class="primary-heading-con">
        <div class="heading">
            <div class="title">Symbols/ Tickers</div>
            <input v-model="searchText" placeholder="Search Tick/Company" />&nbsp;
            <button @click="searchButton">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button> &nbsp;
            <button v-if="excludeTickers" @click="resetTickers">Restore Ignored Tickers</button>
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
                </ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                  v-for="company in filteredCompanies"
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
export default {
    name : "Symbols",
    methods : {
        searchButton : function () {},
        ascend : function () {
            this.sortDirection = 'ascend'
        },
        descend : function () {
            this.sortDirection = 'descend'
        },
        removeSort : function () {
            this.sortDirection = undefined
        },
        exclude : function (event) {
            this.excludeTickers += ' ' + (event.target.value)
        },
        resetTickers : function(event) {
            localStorage.excludeTickers = ''
            this.excludeTickers = ''
        }
    },
    data () {
        return {
            companies : [],
            loading : true,
            searchText : '',
            excludeTickers : '',
            sortKey : 'symbol',
            sortDirection : undefined,
            searchKey : ['symbol', 'companyName'],
            checkboxArray : [false, false, false, false],
        };
    },
    computed : {
        filteredCompanies() {
            const fieldsToFilter = ['symbol','open', 'close', 'primaryExchange'].filter( (value, index) => this.checkboxArray[index]);

            // base case, no searching or filtering being applied
            if(this.searchText === '' && fieldsToFilter.length == 0 && this.excludeTickers == 0 && !this.sortDirection  ){
                return this.companies;
            }

            let accum = this.companies;

            if(this.excludeTickers.length > 0) {
                localStorage.excludeTickers = this.excludeTickers;
                accum = reject(accum, this.excludeTickers)
            }

            if( fieldsToFilter.length > 0 ) {
                accum = filterCompanies(accum, fieldsToFilter );
            }

            if(this.sortDirection){
                accum = sort(accum, this.sortKey, this.sortDirection);
            }

            if(this.searchText !== ''){
                accum = search(accum, this.searchKey, this.searchText);
            }
            return accum;
        },
    },

    beforeMount () {
        API.getComputerHardwareCompanies().then(response => {
            this.companies = response.data;
            return response.data;
        }).finally(() => {
            this.loading = false;
        });
    },
    mounted() {
        if(localStorage.excludeTickers) {
            this.excludeTickers = localStorage.excludeTickers;
        }
    },
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
