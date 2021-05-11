<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{stock.name}}
                    <span v-if="stock.isRisen">
                        <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }}) {{ cPorcentajeDiferencia ? "+" + cPorcentajeDiferencia + "%" : '' }}</small>
                        <i class="risen">{{ cPorcentajeDiferencia ? '▲' : ''}}</i>
                    </span>
                    <span v-else>
                        <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }}) {{ cPorcentajeDiferencia ? cPorcentajeDiferencia + "%" : '' }}</small>
                        <i class="lower">{{ cPorcentajeDiferencia ? '▼' : ''}}</i> 
                    </span>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="from-control" placeholder="Quantity" v-model="quantity" :class="{danger: cCantidadInsuficiente}">
                </div>
                <div class="pull-right">
                    <button class="btn btn-success" @click="sellStock" :disabled=" cCantidadInsuficiente || quantity <= 0 || !Number.isInteger(Number(quantity))">
                        {{ cCantidadInsuficiente ? 'Not Enough' : 'Sell' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import percentageMixin from '../../mixins/PercentageMixin';

export default {
    props: ['stock'],
    mixins: [percentageMixin],
    mounted(){
        console.log('stock, portdolio',this.quantity);
        console.log('',this.cPorcentajeDiferencia);
    },
    data() {
        return {
            quantity: 0,
        };
    },
    computed: {
        cCantidadInsuficiente() {
            return this.quantity > this.stock.quantity;
        }
    },
    methods: {
        ...mapActions({
            placeSellOrder: 'sellStock'
        }),
        sellStock() {
            const order = {
                stockId: this.stock.id,
                quantity: this.quantity,
                stockPrice: this.stock.price
            };

            this.placeSellOrder(order);
            this.quantity = 0;
            console.log(this.quantity);
        }
    }
}
</script>

<style>
.danger{
    border: 1px solid red;
}
.risen {
    color:green;
}
.lower {
    color:red;
}
</style>