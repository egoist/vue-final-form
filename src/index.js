import FinalForm from './Form'
import FinalField from './Field'

export {
  FinalForm,
  FinalField
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(FinalForm.name, FinalForm)
  window.Vue.component(FinalField.name, FinalField)
}
