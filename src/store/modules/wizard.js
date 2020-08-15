// store module:
// wizard

const wizard = {
    namespaced: true,

    // initialize wizard states
    state: {
        currentTab: 0,
        validation: {},
    },

    mutations: {
        setCurrentTab(state, tab) {
            state.currentTab = tab;
        },

        setValidation(state, validation) {
            state.validation = validation;
        },
    },

    actions: {
        nextTab({ commit }, tab) {
            console.log("move to next tab");

            commit("setCurrentTab", tab);
        },
        previousTab({ commit }, tab) {
            console.log("move to previous tab");

            commit("setCurrentTab", tab);
        },

        changeTab({ commit }, tab) {
            console.log("[store] change tab:", tab);

            commit("setCurrentTab", tab);
        },

        changeValidation({ commit }, validation) {
            console.log("[store] changeValidation: ", validation);

            commit("setValidation", validation);
        },
    },

    getters: {
        currentTab: (state) => state.currentTab,
    },
};

export default wizard;
