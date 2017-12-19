export { default as FinalForm } from './Form'
export { default as FinalField } from './Field'

if (typeof window !== 'undefined' && window.Vue) {
  Vue.component(FinalForm.name, FinalForm)
  Vue.component(FinalField.name, FinalField)
}
