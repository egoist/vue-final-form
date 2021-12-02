import { h } from 'vue'
import { createForm, formSubscriptionItems } from 'final-form'
import { getChildren, composeFormValidators } from './utils'

const defaultSubscription = formSubscriptionItems.reduce(
  (result, key) => {
    result[key] = true
    return result
  },
  {}
)

export default {
  name: 'final-form',

  props: {
    initialValues: Object,
    submit: {
      type: Function,
      default: () => {}
    },
    subscription: Object,
    validate: [Function, Array]
  },

  provide() {
    return {
      finalForm: this.finalForm
    }
  },

  data() {
    return {
      finalForm: createForm({
        onSubmit: this.submit,
        initialValues: this.initialValues,
        validate: Array.isArray(this.validate) ? composeFormValidators(this.validate) : this.validate
      }),
      formState: null
    }
  },

  methods: {
    handleSubmit(e) {
      e && e.preventDefault()
      this.finalForm.submit()
    }
  },

  created() {
    this.unsubscribe = this.finalForm.subscribe(state => {
      this.formState = state
      this.$emit('change', state)
    }, this.subscription || defaultSubscription)
  },

  beforeUnmount() {
    this.unsubscribe()
  },

  render() {
    const children = this.$slots.default ?
    this.$slots.default(Object.assign({}, this.formState, {
      handleSubmit: this.handleSubmit,
      mutators: this.finalForm.mutators,
      batch: this.finalForm.batch,
      blur: this.finalForm.blur,
      change: this.finalForm.change,
      focus: this.finalForm.focus,
      initialize: this.finalForm.initialize,
      reset: this.finalForm.reset
    })) :
    this.$slots.default

    return h('div', null, getChildren(children))
  }
}
