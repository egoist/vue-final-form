import { h } from 'vue'
import { getChildren } from './utils.js'
import useForm from './useForm.js'

const FinalForm = {
  name: 'final-form',

  props: {
    initialValues: Object,
    submit: {
      type: Function,
      default: () => {},
    },
    subscription: Object,
    validate: [Function, Array],
  },

  setup(props) {
    const { finalForm, formState } = useForm({
      initialValues: props.initialValues,
      validate: props.validate,
      subscription: props.subscription,
      onSubmit: props.submit,
    })

    return {
      finalForm,
      formState,
    }
  },

  methods: {
    handleSubmit(event) {
      event && event.preventDefault()
      this.finalForm.submit()
    },
  },

  watch: {
    formState(state) {
      this.$emit('change', state)
    },
  },

  render() {
    const children = this.$slots.default
      ? this.$slots.default({
        ...this.formState,
        ...this.finalForm,
      })
      : this.$slots.default

    return h('div', null, getChildren(children))
  },
}

export default FinalForm
