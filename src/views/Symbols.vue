<template>
    <div>
      <div class="primary-heading-con">
        <div class="heading">
        <div class="title">Symbols/Tickers</div>
        <input v-model="searchText" />
<button @click="searchButton">
<i class="fa fa-search" aria-hidden="true"></i>
</button>
          </div>
      </div>

      <div class="page-content-con">
          <loading v-if="loading"></loading>
          <div v-else>
              <div
                  v-for="company in companies"
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

export default {
    name : "Symbols",
    methods : {
        searchButton : function () {
            this.companies = [this.companies[0]];
            return true;
        }
    },
    data () {
        return {
            value : '',
            loading : true,
            companies : [],
            searchText : '',
            finds : []
        };
    },
    watch : {
        searchText : function () {
            this.companies = [this.companies[0]];
            return true;
        }
    },
    beforeMount () {
        API.getComputerHardwareCompanies().then(response => {
            this.companies = response.data;
        }).finally(() => {
            this.loading = false;
        });
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
