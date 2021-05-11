<template>
  <div>
    <app-stock v-for="(i,j) in dStocks" :key="j" :stock="i"></app-stock>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Stock from "./Stock.vue";

export default {
  data() {
    return {
      dStocks: this.$store.getters.stockPortfolio
    };
  },
  watch: {
    "$store.getters.stockPortfolio"() {
      this.dStocks = this.$store.getters.stockPortfolio;
    }
  },
  components: {
    appStock: Stock
  },
};
</script>