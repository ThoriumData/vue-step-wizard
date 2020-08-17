import FormWizard from "./components/wizard/FormWizard.vue";
import StepContent from "./components/wizard/StepContent.vue";
import ValidationHelper from "./components/wizard/ValidationHelper.vue";

const VueStepWizard = {
 install(Vue) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("form-wizard", FormWizard);
    Vue.component("step-content", StepContent);
 }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueStepWizard);
}

export default VueStepWizard;
export {
    FormWizard,
    StepContent,
    ValidationHelper
  };