// vue store for front end
// manages state of the wizard

import Vue from "vue";
import Vuex from "vuex";

// modules
import wizard from "./modules/wizard";

Vue.use(Vuex);

const store = new Vuex.Store({
    // enabling strict mode in the dev environment
    strict: process.env.NODE_ENV !== "production",

    modules: {
        wizard,
    },
});

export default store;
