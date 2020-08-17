// store module:
// wizard

const wizard = {
    namespaced: true,

    // initialize wizard states
    state: {
        currentStep: 0,
        validation: {},
    },

    mutations: {
        setCurrentStep(state, step) {
            state.currentStep = step;
        },

        setValidation(state, validation) {
            state.validation = validation;
        },
    },

    actions: {
        nextStep({ commit }, step) {
            console.log("move to next step");
            commit("setCurrentStep", step);
        },
        previousStep({ commit }, step) {
            console.log("move to previous step");
            commit("setCurrentStep", step);
        },

        changeStep({ commit }, step) {
            console.log("[store] change tab:", step);
            commit("setCurrentStep", step);
        },
        changeValidation({ commit }, validation) {
            console.log("[store] changeValidation: ", validation);
            commit("setValidation", validation);
        },
    },

    getters: {
        currentStep: (state) => state.currentStep,
    },
};

export default wizard;
