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

  methods: {
    getChildParams() {
      const {
        blur,
        change,
        focus,
        value,
        name,
        ...meta
      } = this.fieldState

      return {
        events: this.fieldEvents,
        change,
        value,
        name,
        meta
      }
    },
    setPropsToGenericChild() {
      this.$slots.default[0].componentOptions.propsData = {
        ...this.$slots.default[0].componentOptions.propsData,
        fieldProps: this.getChildParams()
      }
    }
  },

  render() {
    let children = []
    if (this.$scopedSlots.default) {
      children = this.$scopedSlots.default(this.getChildParams())
    } else {
      this.setPropsToGenericChild()
      children = this.$slots.default
    }
    return getChildren(children)[0]
  }
}
