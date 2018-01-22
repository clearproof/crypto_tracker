<template>
    <div>
        <div v-if="globals_bar_placeholder" class="globals-bar-placeholder" style="width: 100%;" v-bind:style="{ height: globals_bar_placeholder_height + 'px' }"></div>
        <div class="globals-bar" v-if="fetchGlobalStatus"  style="z-index: 1020;" id="globals-bar" v-bind:class="{ 'global-bar-sticky': GlobalSticky }" >
            <b-container>
            <!--<b-card>
               <b-container fluid>-->
                <div class="globals-brand" v-if="GlobalSticky">
                    <b-navbar-brand to="/home">
                        <img src="../assets/logo.png" class="d-inline-block align-center"  alt="BV">
                        Market-Cap
                    </b-navbar-brand>
                </div>
            <b-row>
                <!-- BTC info -->
                <b-col class="col-md-3">
                    <b-row>
                        <b-col class="globals-bar-cell col-md-7">
                            <div class="globals-bar-cell-title-big ">
                                <span>BTC price</span>
                            </div>
                            <div class="globals-bar-cell-value-big">${{ global.btcPrice | currencyGlobalFilter }}</div>
                        </b-col>

                        <b-col class="globals-bar-cell">
                            <div class="globals-bar-cell-title">
                                <span>Nodes</span>
                            </div>
                            <div class="globals-bar-cell-value">{{ global.bitnodesCount }}</div>
                        </b-col>
                    </b-row>
                </b-col>

                <!-- capitalization -->
                <b-col class="col-md-5">
                    <b-row>
                        <b-col class="globals-bar-cell col-md-4">
                            <div class="globals-bar-cell-title-big ">
                                <span>Capitalization</span>
                            </div>
                            <div class="globals-bar-cell-value-big">${{ global.totalCap | currencyFilter }}</div>
                        </b-col>

                        <b-col class="globals-bar-cell col-md-2">
                            <div class="globals-bar-cell-title">
                                <span>Bitcoin</span>
                            </div>
                            <div class="globals-bar-cell-value ">${{ global.btcCap | currencyFilter }}</div>
                        </b-col>

                        <b-col class="globals-bar-cell col-md-2">
                            <div class="globals-bar-cell-title">
                                <span>Altcoins</span>
                            </div>
                            <div class="globals-bar-cell-value">${{ global.altCap | currencyFilter }}</div>
                        </b-col>

                        <b-col class="globals-bar-cell col-md-2">
                            <div class="globals-bar-cell-title">
                                <span>Dom Index</span>
                            </div>
                            <div class="globals-bar-cell-value">{{ global.dom }}%</div>
                        </b-col>
                    </b-row>

                </b-col>




                <!-- Exchange volume -->
                <b-col class="col-md-4">
                    <b-row>
                        <b-col class="globals-bar-cell col-md-5">
                            <div class="globals-bar-cell-title-big ">
                                <span>Exchange Vol</span>
                            </div>
                            <div class="globals-bar-cell-value-big">${{ global.volumeTotal | currencyFilter }}</div>
                        </b-col>

                        <b-col class="globals-bar-cell col-md-3">
                            <div class="globals-bar-cell-title">
                                <span>Bitcoin</span>
                            </div>
                            <div class="globals-bar-cell-value">${{ global.volumeBtc | currencyFilter }}</div>
                        </b-col>

                        <b-col class="globals-bar-cell col-md-2">
                            <div class="globals-bar-cell-title">
                                <span>Altcoins</span>
                            </div>
                            <div class="globals-bar-cell-value">${{ global.volumeAlt | currencyFilter }}</div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <!-- </b-container>
        </b-card> -->
            </b-container>
        </div>
        <b-container>
            <!--<b-jumbotron header="Awesomeness" lead="ahyea" >
                <p>bitwhat? crypto who? wanna understand this awesome new stuff going on. Sign up and pay me.</p>
                <b-btn variant="primary" href="#">More Info</b-btn>
            </b-jumbotron>-->


        <div v-if="frontErr">
                {{ frontErr }}
        </div>
        <div v-if="globalErr">
            {{ globalErr }}
        </div>

        <div v-if="!fetchFrontStatus" class="loading" >
            <i class="fa fa-refresh fa-spin fa-5x fa-fw"></i>
            <h2>Loading data...</h2>
        </div>
        <div v-else>
            <b-row>
                <b-col class="col-sm-6 offset-md-4">
                    <b-form-group horizontal label="Search:" :label-cols="2">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Search Coin, Price, ..." />
                            <b-input-group-button>
                                <b-btn @click="filter = ''">Clear</b-btn>
                            </b-input-group-button>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col class="col-sm-2 text-md-right">
                    <b-button :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button>
                </b-col>
            </b-row>

                <b-table id="table-coins" :filter="filter" show-empty outlined :per-page="coins_slice" foot-clone head-variant="dark" foot-variant="dark" hover :items="coins" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :fields="fields">
                    <template slot="chart" slot-scope="row">

                        <b-form-checkbox v-model="row.item._showDetails">
                            <div class="small-chart" >
                                <small-chart :chart-data="data4chart" :width="150" :height="50"></small-chart>
                            </div>
                        </b-form-checkbox>

                    </template>
                    <template slot="row-details" slot-scope="row">
                        <b-card>
                            <b-row class="mb-2">
                                <awesome-chart></awesome-chart>
                            </b-row>
                        </b-card>
                    </template>
                    <template slot="coin_name" slot-scope="data">
                        <i class="cc" :class="data.item.fontClass"></i> {{data.item.short}} - {{data.item.long}}
                    </template>
                    <template slot="perc" slot-scope="data">
                        <span :style="getColor(data.item.perc)">
                            <span v-if="data.item.perc > 0">+</span>{{data.item.perc}}%
                        </span>
                    </template>

                </b-table>
        </div>
   </b-container>
</div>

</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { currencyFilter } from '../filters/currency';


  export default {
    data () {
      return {
        filter: null,
        sortBy: 'rank',
        sortDesc: false,
        fields: [
          { key: 'rank', sortable: true, label: "Rank" , _showDetails: false},
          { key: 'coin_name', sortable: false, label: "Coin" , _showDetails: false},
          { key: 'price', sortable: true, label: "Price ($)", formatter: (value) => currencyFilter(value), _showDetails: false },
          { key: 'mktcap', sortable: true, label: "Marketcap", formatter: (value) => currencyFilter(value) , _showDetails: false},
          { key: 'volume', sortable: true, label: "Volume 24h", formatter: (value) => currencyFilter(value), _showDetails: false },
          { key: 'perc', sortable: true, label: "Change 24h", formatter: (value) => currencyFilter(value), _showDetails: false },
          { key: 'chart', sortable: false, label: "Chart 1D, 1W, 1M" },
        ],
        data4chart: {
          labels: ['I', 'm', 'just', 'testing', 'Power!', 'No', 'Weakness!!'],
          datasets: [{ label: 'Data One', backgroundColor: '#f87979', pointRadius: 0, data: [2, 3, 4, 1, 8, 2, 4]}]
        },
        GlobalSticky: false,
        global_bar_position: null,
        globals_bar_placeholder: false,
        globals_bar_placeholder_height: 0,
        coins_slice: 50,
        //table_coins_bottom_position: null
      }
    },
    computed: mapGetters({
      coins: 'coins',
      global: 'global',
      fetchFrontStatus: 'fetchFrontStatus',
      fetchGlobalStatus: 'fetchGlobalStatus',
      frontErr: 'frontErr',
      globalErr: 'globalErr',
    }),
    /*methods: mapActions([
    'addToCart'
    ]),*/
    methods: {
      handleScroll (event) {
        if(this.global_bar_position === null){
          this.global_bar_position = document.getElementById("globals-bar").offsetTop;
          this.globals_bar_placeholder_height=  document.getElementById("globals-bar").offsetHeight;
        }

        if(window.pageYOffset >= this.global_bar_position ){
          this.GlobalSticky = true;
          this.globals_bar_placeholder = false;
        }
        else if (window.pageYOffset < this.global_bar_position ){
          this.GlobalSticky = false;
          this.globals_bar_placeholder = false;
        }

        // Lazy load data endless scroll
        let table_offset = document.getElementById("table-coins").offsetHeight * 0.8; // 3/4 of element
        if(window.pageYOffset >= table_offset){
          this.coins_slice += 10; // add 10 by 10
        }
      },
      getColor: function (perc) {
        return perc > 0 ? "color:green;" : "color:red;";
      },
    },
    /*sockets: {
      connect() {
        // Fired when the socket connects.
        this.isConnected = true;
        console.log("connected");
      },

      disconnect() {
        this.isConnected = false;
        console.log("disconnect");
      },

      // Fired when the server sends something on the "messageChannel" channel.
      messageChannel(data) {
        this.socketMessage = data;
        console.log(socketMessage);
      },
      trades(data){
        console.log(data);
      }
    },*/
    created () {
      this.$store.dispatch('fetchFront');
      this.$store.dispatch('fetchGlobal');
      window.addEventListener('scroll', this.handleScroll);

    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    }
    /*watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
    },*/
  }
</script>
<style>
    .small-chart{
        max-width: 150px;
        max-height: 50px;
        border: 1px solid #000000;
    }
    .loading{
        font: .875rem "Montserrat","helvetica neue",helvetica,arial,sans-serif;
        text-align: center;
        margin:0 auto;
        padding-top: 5rem;
    }
    .global-bar-sticky {

        top: 0;
        /*position: sticky;*/
        position: sticky;
        width: 100%;
        /*-webkit-transition: all 500ms cubic-bezier(0.420, 0.000, 1.000, 1.000);
        -moz-transition: all 500ms cubic-bezier(0.420, 0.000, 1.000, 1.000);
        -o-transition: all 500ms cubic-bezier(0.420, 0.000, 1.000, 1.000);
        transition: all 500ms cubic-bezier(0.420, 0.000, 1.000, 1.000);*/
    }
</style>