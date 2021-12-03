import { provide, ref, onUnmounted } from 'vue'
import { createForm, formSubscriptionItems } from 'final-form'
import { composeFormValidators, makeSubscriptionObject } from './utils.js'

const defaultSubscription = makeSubscriptionObject(formSubscriptionItems)

const useForm = config => {
  const finalForm = ref(createForm({
    initialValues: config.initialValues,
    validate: Array.isArray(config.validate) ? composeFormValidators(config.validate) : config.validate,
    onSubmit: config.onSubmit,
  }))

  const formState = ref()

  const unsubscribe = finalForm.value.subscribe(state => {
    formState.value = state
  }, config.subscription || defaultSubscription)

  onUnmounted(unsubscribe)

  provide('finalForm', finalForm)

  return {
    finalForm,
    formState,
    unsubscribe,
  }
}

export default useForm
