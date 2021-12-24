import { getChildren } from './utils.js'
import useField from './useField.js'

const FinalField = {
  name: 'final-field',

  props: {
    name: {
      required: true,
      type: String,
    },
    validate: [Function, Array],
    subscription: Object,
  },

  setup(props) {
    const { finalForm, fieldState } = useField({
      name: props.name,
      subscription: props.subscription,
      validate: props.validate,
    })

    return {
      finalForm,
      fieldState,
    }
  },

  watch: {
    fieldState(state) {
      this.$emit('change', state)
    },
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

    const children = this.$slots.default({
      events: this.fieldState.events,
      change,
      value,
      name,
      meta,
    })

    return getChildren(children)[0]
  },
}

export default FinalField
