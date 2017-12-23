<template>
  <div>
    <FinalForm
      :submit="handleSubmit"
      @change="updateState"
      :initialValues="initialValues">
      <form slot-scope="props" @submit="props.handleSubmit">
        <FinalField name="email" :validate="required">
          <div slot-scope="props">
            <input
              v-on="props.events"
              :name="props.name"
              :value="props.value"
            />
            <span
              class="error"
              v-if="props.meta.touched && props.meta.error">
              {{ props.meta.error }}
            </span>
          </div>
        </FinalField>
        <button type="submit" :disabled="props.submitting">
          {{ props.submitting ? 'Submitting' : 'Submit' }}
        </button>
      </form>
    </FinalForm>

    <pre v-if="formState"><code>form state:<br><br>{{ JSON.stringify(formState, null, 2) }}</code></pre>
  </div>
</template>

<script>
import { FinalForm, FinalField } from 'vue-final-form'

function sleep(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout);
  })
}

export default {
  components: {
    FinalForm,
    FinalField
  },

  data() {
    return {
      formState: null,
      initialValues: {
        email: 'egoist@boring.com'
      }
    }
  },

  methods: {
    async handleSubmit(state) {
      await sleep(2000)
      console.log(state)
    },

    updateState(state) {
      this.formState = state
    },

    required(v) {
      return v ? null : 'This field is required!'
    }
  }
}
</script>
