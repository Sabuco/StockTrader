export default {
    
    computed: {
        cPorcentajeDiferencia() {
            if(this.stock.oldPrice == 0 || this.stock.price == 0) {
                return 0;
            } else {
                var calc = (this.stock.price - this.stock.oldPrice ) / this.stock.oldPrice * 100;
                return Number(calc.toFixed(2));
                // return new Intl.NumberFormat("de-DE", {style: "percent"}).format(calc);
            } 
        }
    }
}