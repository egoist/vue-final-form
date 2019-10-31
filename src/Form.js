import { createForm, formSubscriptionItems } from 'final-form'
import assign from 'nano-assign'
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
    validate: [Function, Array],
    mutators: {
      type: Object,
      required: false,
    }
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
        mutators: this.mutators,
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

  watch: {
    mutators(newValue) {
      this.finalForm.setConfig('mutators', newValue)
    },
  },

  created() {
    this.unsubscribe = this.finalForm.subscribe(state => {
      this.formState = state
      this.$emit('change', state)
    }, this.subscription || defaultSubscription)
  },

  beforeDestroy() {
    this.unsubscribe()
  },

  render(h) {
    const children = this.$scopedSlots.default ?
    this.$scopedSlots.default(assign({}, this.formState, {
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
