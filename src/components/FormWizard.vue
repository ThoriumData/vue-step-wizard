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

        <ul class="wizard-steps">
          <li @click.prevent.stop="selectTab(index)"
            class="step-item"
            :class="{ 'active': tab.isActive, 'validated': tab.isValidated, 'completed': tab.isCompleted }"
            v-for="(tab, index) in tabs"
            v-bind:key="`tab-${index}`">
              <a class="step-link" href="#">
                  <span class="stepIndex">{{index+1}} </span>
                  <span class="stepLabel">{{tab.title}}</span>
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
                  <button type="button" @click="previousTab" :disabled="isFirstStep" class="btn btn-secondary step-button">Previous</button>
                  <button type="button" @click="nextTab" v-if="isMiddleStep" class="btn btn-primary step-button">Continue</button>
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

export default {
    name: "form-wizard",
    data() {
        return{
            tabs: [],
            currentTab: 0,
            totalTabs: 0,
            // storeState: store.state,
            submitSuccess: false,
            progress: 0,
            isValidationSupport: false
        }
    },
    mounted() {
            this.tabs = this.$children;
            this.totalTabs = this.tabs.length;
            this.currentTab = this.tabs.findIndex((tab) => tab.isActive === true);
            console.log ("[mounted] tabs:", this.tabs);

            // Select first tab if none is marked selected
            if(this.currentTab === -1 && this.totalTabs > 0){
                this.tabs[0].isActive = true;
                this.currentTab = 0;
            }

            // Setup Initial Progress
            // this.progress = ((this.currentTab + 1) / this.totalTabs * 100);

    },

    updated() {
        /*
          Using this lifehook - since store variable gets updated after component is mounted
          isValidationSupport checks if user is looking to perform validation on each step
        */
        // this.isValidationSupport = (Object.keys(this.store.validation).length !== 0 && this.store.validation.constructor === Object) ? true : false;
    },

    methods: {
        previousTab() {
          console.log ("[formwizard] previous step");
            this._switchTab(this.currentTab - 1);
            this.$emit('onPreviousStep');
        },

        nextTab() {
          console.log ("[formwizard] next step");
            if(this._validateCurrentTab() === false) {
                return;
            }
            this._switchTab(this.currentTab + 1);
            this.$emit('onNextStep');

        },

        // not using reset functionality
        reset() {
           this.tabs.forEach(tab => {
             tab.isActive = false;
             tab.isValidated = false;
           });
           this._switchTab(0);
           this.submitSuccess = false;
          //  this.store.validation.$reset();

           this.$emit('onReset');
        },

        changeStatus() {
            this.submitSuccess = true;
        },

        selectTab(index) {

          console.log ("[selecttab] index:", index);
          console.log ("[selecttab] currentTab:", this.currentTab);

            // clicking the current tab? dont do anything.
            if (index === this.currentTab) {
              return;
            };

            if (index < this.currentTab) {
              this._switchTab(index);
            }

            if (this._validateCurrentTab() === false ){
                return;
            }

            if (index !== 0) {
              if (this.tabs[index - 1].isValidated === false) {
                  return;
              }
            }

            this._switchTab(index);
        },

        onCancel() {
           console.log ("[formwizard] cancelling...");
        },


        onSubmit() {
          console.log ("[formwizard] submitting...");
            if (this._validateCurrentTab() === false)
                return;
            this.$emit('onComplete');
        },

        _switchTab(index) {
            // change state of tabs when changing

            console.log ("[switch] to tab:", index);

            this.tabs.forEach((tab, eachIndex) => {
              // console.log ("[switch] ", eachIndex);

              if (eachIndex === index) {
                  this.currentTab = index;
                  this.tabs[index].isActive = true;
                  this.tabs[index].isCompleted = false;
              } else {
                tab.isActive = false;

                if (eachIndex < index) {
                  this.tabs[eachIndex].isCompleted = true;
                }
              }
            });


            // this.progress = ((this.currentTab + 1) / this.totalTabs * 100);
        },

        _validateCurrentTab() {
            if(!this.isValidationSupport)  //Check if user wants to validate
                return true;

            // this.store.validation.$touch();

            // if (this.store.validation.$invalid) {
                // this.tabs[this.currentTab].isValidated = false;
                // return false;
            // }

            this.tabs[this.currentTab].isValidated = true;

            return true;
        },
        _completeCurrentTab() {

            this.tabs[this.currentTab].isCompleted = true;
            return true;
        }

    },

    computed: {
      isFirstStep() {
        console.log ("[first?] first:", (this.currentTab === 0) ? true : false);
        return (this.currentTab === 0) ? true : false;

      },
      isLastStep() {
        console.log ("[last?] last:", this.currentTab, '/', this.totalTabs, ':', (this.currentTab === this.totalTabs) ? true : false);
        return (this.currentTab === (this.totalTabs - 1)) ? true : false;
      },
      isMiddleStep() {
        console.log ("[midle?] middle:", this.currentTab, '/', this.totalTabs, ':', (this.currentTab < this.totalTabs) ? true : false);
        return (this.currentTab < (this.totalTabs - 1)) ? true : false;
      },

    },

    watch: {
       currentTab() {
          this.$store.dispatch("wizard/changeTab", this.currentTab);
          // this.$store.setCurrentTab(this.currentTab);
       }
    }

}
</script>


<style lang="scss">

</style>