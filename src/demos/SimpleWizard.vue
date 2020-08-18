<template>
    <div>
        <h1>
            Page Heading
        </h1>

   <form-wizard ref="formwizard" @onComplete="onComplete" @onNextStep="nextStep" @onPreviousStep="previousStep" @onReset="reset" @onCancel="cancel">

        <step-content title="Source Type" :selected="true">

            <h3>
                Select the type of data source.
            </h3>

            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" class="form-control" :class="hasError('fullName') ? 'is-invalid' : ''" placeholder="Enter your name" v-model="formData.fullName">
                <div v-if="hasError('fullName')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.fullName.required">Please provide a valid name.</div>
                </div>
            </div>
            <div class="form-group">
                <label for="email">Your Email</label>
                <input type="email" class="form-control" :class="hasError('email') ? 'is-invalid' : ''" placeholder="Enter your email" v-model="formData.email">
                <div v-if="hasError('email')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.email.required">Email field is required</div>
                    <div class="error" v-if="!$v.formData.email.email">Should be in email format</div>
                </div>
            </div>
        </step-content>

        <step-content title="Connection Details">

            <h3>
                Select the type of data source.
            </h3>

            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" class="form-control" :class="hasError('fullName') ? 'is-invalid' : ''" placeholder="Enter your name" v-model="formData.fullName">
                <div v-if="hasError('fullName')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.fullName.required">Please provide a valid name.</div>
                </div>
            </div>
            <div class="form-group">
                <label for="email">Your Email</label>
                <input type="email" class="form-control" :class="hasError('email') ? 'is-invalid' : ''" placeholder="Enter your email" v-model="formData.email">
                <div v-if="hasError('email')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.email.required">Email field is required</div>
                    <div class="error" v-if="!$v.formData.email.email">Should be in email format</div>
                </div>
            </div>

        </step-content>

        <step-content title="Select Data Sets">
            <h3>
                Select the individual data sets.
            </h3>
            <div class="form-group">
                <label for="referral">From Where did you hear about us</label>
                <select :class="hasError('referral') ? 'is-invalid' : ''" class="form-control" v-model="formData.referral">
                    <option>Newspaper</option>
                    <option>Online Ad</option>
                    <option>Friend</option>
                    <option>Other</option>
                </select>
                <div v-if="hasError('referral')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.referral.required">Please select one of the fields.</div>
                </div>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" :class="hasError('terms') ? 'is-invalid' : ''" class="form-check-input" v-model="formData.terms">
                <label class="form-check-label">I accept terms and conditions</label>
                <div v-if="hasError('terms')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.terms.required">Please select terms and conditions.</div>
                </div>
            </div>
        </step-content>

        <step-content title="Verify">
            <h3>
                Provide individual details for each selected asset.
            </h3>
            <div class="form-group">
                <label for="referral">From Where did you hear about us</label>
                <select :class="hasError('referral') ? 'is-invalid' : ''" class="form-control" v-model="formData.referral">
                    <option>Newspaper</option>
                    <option>Online Ad</option>
                    <option>Friend</option>
                    <option>Other</option>
                </select>
                <div v-if="hasError('referral')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.referral.required">Please select one of the fields.</div>
                </div>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" :class="hasError('terms') ? 'is-invalid' : ''" class="form-check-input" v-model="formData.terms">
                <label class="form-check-label">I accept terms and conditions</label>
                <div v-if="hasError('terms')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.terms.required">Please select terms and conditions.</div>
                </div>
            </div>
        </step-content>
    </form-wizard>

    <modal>



    </modal>
    </div>




</template>

<script>
import FormWizard from '../components/wizard/FormWizard.vue';
import StepContent from '../components/wizard/StepContent.vue';
// import Modal from '../components/Modal.vue';

import WizardValidationHelper from '../components/wizard/WizardValidationHelper.vue';

import { required, email, numeric } from 'vuelidate/lib/validators';

const checked = (value) => value === true;

export default {
    name: 'SimpleWizard',
    components: {
        FormWizard,
        StepContent,
        // Modal
    },
    mixins: [WizardValidationHelper],
    data(){
        return {
            formData:{
                fullName: "",
                email: null,
                companyName: null,
                numberOfEmployees: null,
                referral: null,
                terms: false,
            },
            validationRules:[
                {
                    fullName: {required},
                    email: {required, email}
                },
                {
                    companyName: {required},
                    numberOfEmployees: {required, numeric}
                },
                {
                    referral: {required},
                    terms: {checked}
                }
            ]
        }
    },
    methods:{
        onComplete() {
            alert("[simplewizard] Submitting Form.");
            this.$refs.formwizard.changeStatus();
        },

        reset() {
            console.log("[simplewizard] resetting the form.");
            for(let field in this.formData){
                this.formData[field] = null;
            }
        },

        cancel() {
            console.log("[simplewizard] cancel the whole thing?");
        },

        nextStep() {
            console.log("[simplewizard] going to Next Step");
        },

        previousStep() {
            console.log("[simplewizard] going to Previous Step");
        }
    }
}
</script>