<template>
    <div id="wizard">

        <div class="wizard-header">

  <!-- disable progress bar -->
  <!--
        <div class="wizard-progress">
          <div class="bar progressbar" :style="{ width: progress + '%' }">
          </div>
        </div>
  -->

        <!-- build the list of steps as 'tabs' -->
        <ul class="wizard-steps">
          <li @click.prevent.stop="selectStep(index)"
            class="step-item"
            :class="{ 'active': step.isActive, 'validated': step.isValidated, 'completed': step.isCompleted }"
            v-for="(step, index) in steps"
            v-bind:key="`step-${index}`">
              <a class="step-link" href="#">
                  <span class="stepIndex">{{index+1}} </span>
                  <span class="stepLabel">{{step.title}}</span>
              </a>
          </li>
        </ul>

        </div>

        <div class="wizard-body">
            <form>
                <slot></slot>
            </form>
        </div>

        <div class="wizard-footer">
            <!-- <div class="btn-group" role="group"> -->
                <template v-if="!submitSuccess">
                  <button type="button" @click="previousStep" :disabled="isFirstStep" v-show="!isFirstStep" class="btn btn-secondary step-button">Previous</button>
                  <button type="button" @click="nextStep" v-if="isMiddleStep" class="btn btn-primary step-button">Continue</button>
                  <button type="button" @click="onSubmit" v-if="isLastStep" class="btn btn-primary step-button step-button-submit">Submit</button>
                  <button type="button" @click="onCancel" class="btn btn-outline-secondary step-button step-button-cancel">Cancel</button>
                </template>

                <!-- <template v-else>
                  <button @click="reset" class="step-button step-button-reset">Reset</button>
                </template> -->
            <!-- </div> -->
        </div>

    </div>
</template>

<script>

import { RegisterStoreModule } from "@/mixins/mixins";

// have component import its own store, which is registered on created()
import wizardModule from "@/store/modules/wizard";

export default {
    name: "form-wizard",

    mixins: [RegisterStoreModule],

    data() {
        return{
            steps: [],
            currentStep: 0,
            totalSteps: 0,
            // storeState: store.state,
            submitSuccess: false,
            progress: 0,
            isValidationSupport: false
        }
    },

    created() {
      this.registerStoreModule('wizard', wizardModule);
    },
    mounted() {
            this.steps = this.$children;
            this.totalSteps = this.steps.length;
            this.currentStep = this.steps.findIndex((step) => step.isActive === true);
            console.log ("[mounted] steps:", this.steps);

            // Select first step/tab if none is marked selected
            if(this.currentStep === -1 && this.totalSteps > 0){
                this.steps[0].isActive = true;
                this.currentStep = 0;
            }

            // Setup Initial Progress
            // this.progress = ((this.currentStep + 1) / this.totalSteps * 100);

    },

    updated() {
        /*
          Using this lifehook - since store variable gets updated after component is mounted
          isValidationSupport checks if user is looking to perform validation on each step
        */
        // this.isValidationSupport = (Object.keys(this.store.validation).length !== 0 && this.store.validation.constructor === Object) ? true : false;
    },

    methods: {
        previousStep() {
          console.log ("[formwizard] previous step");
            this._switchStep(this.currentStep - 1);
            this.$emit('onPreviousStep');
        },

        nextStep() {
          console.log ("[formwizard] next step");
            if(this._validateCurrentStep() === false) {
                return;
            }
            this._switchStep(this.currentStep + 1);
            this.$emit('onNextStep');

        },

        // not using reset functionality
        reset() {
           this.steps.forEach(step => {
             step.isActive = false;
             step.isValidated = false;
           });
           this._switchStep(0);
           this.submitSuccess = false;
          //  this.store.validation.$reset();

           this.$emit('onReset');
        },

        changeStatus() {
            this.submitSuccess = true;
        },

        selectStep(index) {

          console.log ("[selectStep] index:", index);
          console.log ("[selectStep] currentStep:", this.currentStep);

            // clicking the current step/tab? dont do anything.
            if (index === this.currentStep) {
              return;
            };

            if (index < this.currentStep) {
              this._switchStep(index);
            }

            if (this._validateCurrentStep() === false ){
                return;
            }

            if (index !== 0) {
              if (this.steps[index - 1].isValidated === false) {
                  return;
              }
            }

            this._switchStep(index);
        },

        onCancel() {
           console.log ("[formwizard] cancelling...");
        },


        onSubmit() {
          console.log ("[formwizard] submitting...");
            if (this._validateCurrentStep() === false)
                return;
            this.$emit('onComplete');
        },

        _switchStep(index) {
            // change state of steps/tabs when changing

            console.log ("[switch] to step:", index);

            this.steps.forEach((step, eachIndex) => {
              // console.log ("[switch] ", eachIndex);

              if (eachIndex === index) {
                  this.currentStep = index;
                  this.steps[index].isActive = true;
                  this.steps[index].isCompleted = false;
              } else {
                step.isActive = false;

                if (eachIndex < index) {
                  this.steps[eachIndex].isCompleted = true;
                }
              }
            });


            // this.progress = ((this.currentStep + 1) / this.totalSteps * 100);
        },

        _validateCurrentStep() {
            if(!this.isValidationSupport)  //Check if user wants to validate
                return true;

            // this.store.validation.$touch();

            // if (this.store.validation.$invalid) {
                // this.steps[this.currentStep].isValidated = false;
                // return false;
            // }

            this.steps[this.currentStep].isValidated = true;

            return true;
        },
        _completeCurrentStep() {
            this.steps[this.currentStep].isCompleted = true;
            return true;
        }

    },

    computed: {
      isFirstStep() {
        console.log ("[first?] first:", (this.currentStep === 0) ? true : false);
        return (this.currentStep === 0) ? true : false;

      },
      isLastStep() {
        console.log ("[last?] last:", this.currentStep, '/', this.totalSteps, ':', (this.currentStep === this.totalSteps) ? true : false);
        return (this.currentStep === (this.totalSteps - 1)) ? true : false;
      },
      isMiddleStep() {
        console.log ("[midle?] middle:", this.currentStep, '/', this.totalSteps, ':', (this.currentStep < this.totalSteps) ? true : false);
        return (this.currentStep < (this.totalSteps - 1)) ? true : false;
      },

    },

    watch: {
       currentStep() {
          this.$store.dispatch("wizard/changeStep", this.currentStep);
          // this.$store.setCurrentStep(this.currentStep);
       }
    }

}
</script>


<style lang="scss">

</style>