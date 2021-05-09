<template>
    <div>
    </div>
</template>

<script>

import { validationMixin } from "vuelidate";

// import { store } from "../store/store";

export default {
    name: 'WizardValidationHelper',
    mixins: [validationMixin],

    data() {
        return {
            // storeState: store.state,
            storeState: this.$store.state.wizard,
        }
    },

    mounted() {
        // store.setValidation(this.$v);
        this.$store.dispatch("wizard/changeValidation", this.$v);
    },
    computed: {
        rules() {
            console.log ("** WVH: ", this.validationRules)
            if(this.validationRules)
                // return this.validationRules[this.store.currentStep] ? this.validationRules[this.store.currentStep] : {}
                return this.validationRules[this.$store.state.wizard.currentStep] ? this.validationRules[this.$store.state.wizard.currentStep] : {}
            else {
                // return {};
            return true;
            }
        },
    },
    methods: {
        hasError(fieldName){
            return (fieldName in this.$v.formData) && (this.$v.formData[fieldName].$error)
        }
    },

    validations() {
        return {
            formData: this.rules
        };
    }
}
</script>