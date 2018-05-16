import { fieldSubscriptionItems } from 'final-form'
import { getChildren, composeFieldValidators } from './utils'

export default {
  name: 'final-field',

  inject: ['finalForm'],

  props: {
    name: {
      required: true,
      type: String
    },
    validate: [Function, Array],
    subscription: Object
  },

  data() {
    return {
      fieldState: {}
    }
  },

  created() {
    const subscription = this.subscription || fieldSubscriptionItems.reduce((result, key) => {
      result[key] = true
      return result
    }, {})

    this.unsubscribe = this.finalForm.registerField(this.name, fieldState => {
      this.fieldState = fieldState
      this.$emit('change', fieldState)
    }, subscription, {
      getValidator: Array.isArray(this.validate) ? composeFieldValidators(this.validate) : () => this.validate
    })
  },

  beforeDestroy() {
    this.unsubscribe()
  },

  computed: {
    fieldEvents() {
      return {
        input: e => this.fieldState.change(e.target.value),
        blur: () => this.fieldState.blur(),
        focus: () => this.fieldState.focus()
      }
    }
  },

  render() {
    const {
      blur,
      change,
      focus,
      value,
      name,
      ...meta
    } = this.fieldState

    const children = this.$scopedSlots.default({
      events: this.fieldEvents,
      value,
      name,
      meta
    })

    return getChildren(children)[0]
  }
}
