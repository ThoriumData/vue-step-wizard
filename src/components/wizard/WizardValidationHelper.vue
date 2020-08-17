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
        return{
            // storeState: store.state,
        }
    },
    mounted() {
        // store.setValidation(this.$v);
        this.$store.dispatch("wizard/changeValidation", this.$v);
    },
    computed: {
        rules() {
            // if(this.validationRules)
                // return this.validationRules[this.store.currentStep] ? this.validationRules[this.store.currentStep] : {}
            // else
                // return {};
            return true;
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