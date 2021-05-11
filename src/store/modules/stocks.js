import stocks from '../../DATA/stocks';

const state = {
    stocks: []
};

const mutations = {
    'SET_STOCKS' (state, stocks) {
        state.stocks = stocks;
    },
    'RND_STOCKS' (state) {
        state.stocks.forEach(currentStock => {
            
            if(currentStock.price == 1) {
                currentStock.oldPrice = currentStock.price; //Me guardo valor anterior
                currentStock.price = Math.round(currentStock.price * 100); //rescate con fondos europeos
            } else {
                currentStock.oldPrice = currentStock.price;
                currentStock.price = Math.round(currentStock.price * (1 + Math.random() - 0.4));

            }

            if(currentStock.price > currentStock.oldPrice) {
                currentStock.isRisen = true;
            }
            if(currentStock.price < currentStock.oldPrice) {
                currentStock.isRisen = false;
            }
            // console.log('subida :', currentStock.isRisen);
        });
    }
};

const actions = {
    buyStock: ({commit}, order) => {
        commit('BUY_STOCK', order);
    },
    initStocks: ({commit}) => {
        commit('SET_STOCKS', stocks);
    },
    randomizeStocks: ({commit}) => {
        commit('RND_STOCKS');
    }
};

const getters = {
    stocks: state => {
        return state.stocks;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}