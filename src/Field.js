import { fieldSubscriptionItems } from 'final-form'
import { composeFieldValidators } from './utils'

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

  methods: {
    isChangeTarget(target) {
      return (target.nodeName === 'INPUT' && target.type === 'checkbox') ||
        (target.nodeName === 'SELECT' && target.multiple)
    },
    fieldEvents(slotScope) {
      return {
        change: e => this.isChangeTarget(e.target) && this.fieldState.change(slotScope.value),
        input: e => !this.isChangeTarget(e.target) && this.fieldState.change(e.target.value),
        blur: () => this.fieldState.blur(),
        focus: () => this.fieldState.focus()
      }
    }
  },

  render() {
    const {
      change,
      value,
      name,
      ...meta
    } = this.fieldState

    const slotScope = {
      change,
      value,
      name,
      meta
    }

    return this.$scopedSlots.default(Object.assign(slotScope, {
      events: this.fieldEvents(slotScope)
    }))
  }
}
