import { fieldSubscriptionItems } from 'final-form'
import { inject, ref, onUnmounted, computed } from 'vue'
import { composeFieldValidators, makeSubscriptionObject } from './utils.js'

const defaultSubscription = makeSubscriptionObject(fieldSubscriptionItems)

const useField = config => {
  const finalForm = config.finalForm || inject('finalForm')

  const fieldState = ref({})

  const unregister = finalForm.value.registerField(config.name, state => {
    fieldState.value = state
  }, config.subscription || defaultSubscription, {
    getValidator: Array.isArray(config.validate) ? composeFieldValidators(config.validate) : () => config.validate,
  })

  onUnmounted(unregister)

  return {
    fieldState: computed(() => ({
      ...fieldState.value,
      events: {
        input: event => fieldState.value.change(event.target.value),
        focus: () => fieldState.value.focus(),
        blur: () => fieldState.value.blur(),
      },
    })),
    unregister,
  }
}

export default useField
