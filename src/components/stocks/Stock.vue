<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-warning">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{stock.name}}
          <span v-if="stock.isRisen">
            <small>(Price: {{ stock.price }}) {{ cPorcentajeDiferencia ? "+" + cPorcentajeDiferencia + "%" : '' }}</small>
            <i class="risen">{{ cPorcentajeDiferencia ? '▲' : ''}}</i>
          </span>
          <span v-else>
             <small>(Price: {{ stock.price }}) {{ cPorcentajeDiferencia ? cPorcentajeDiferencia + "%" : '' }}</small>
             <i class="lower">{{ cPorcentajeDiferencia ? '▼' : ''}}</i> 
          </span>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input type="number" class="from-control" placeholder="Quantity" v-model="quantity" :class="{danger: cFondosInsuficientes}"/>
        </div>
        <div class="pull-right">
          <button
            class="btn btn-success"
            @click="buyStock"
            :disabled=" cFondosInsuficientes || quantity <= 0 || !Number.isInteger(Number(quantity))"
          >
          {{ cFondosInsuficientes ? 'Insufficient funds' : 'Buy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import percentageMixin from "../../mixins/PercentageMixin";

export default {
  props: ["stock"],
  mixins: [percentageMixin],
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    cfunds() {
      return this.$store.getters.funds;
    },
    cFondosInsuficientes() {
      return this.stock.price * this.quantity > this.cfunds;
    },
    
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: Number.parseInt(this.quantity)
      };

      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    }
  },
  mounted() {
    console.log(this.stock);
  }
};
</script>

<style scoped>
    .danger {
        border: 1px solid red;
    }
    .risen {
        color:green;
    }
    .lower {
        color:red;
    }
</style>