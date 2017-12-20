import { createForm, formSubscriptionItems } from 'final-form'
import { getChildren } from './utils'

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
      required: true
    },
    subscription: Object
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
        initialValues: this.initialValues
      }),
      initialState: null
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
      this.$emit('change', state)
    }, this.subscription || defaultSubscription)
  },

  beforeDestory() {
    this.unsubscribe()
  },

  render(h) {
    const children = this.$scopedSlots.default ?
    this.$scopedSlots.default({
      handleSubmit: this.handleSubmit
    }) :
    this.$slots.default

    return h('div', null, getChildren(children))
  }
}
