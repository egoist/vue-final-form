<template>
  <div>
    <FinalForm
      :submit="handleSubmit"
      @change="updateState"
      :initialValues="initialValues">
      <form slot-scope="props" @submit="props.handleSubmit">
        <FinalField name="email" :validate="required" :validateFields="[]">
          <div slot-scope="props">
            <input
              v-on="props.events"
              :name="props.name"
              :value="props.value"
              type="email"
            />
            <span
              class="error"
              v-if="props.meta.touched && props.meta.error">
              {{ props.meta.error }}
            </span>
          </div>
        </FinalField>
        <FinalField name="password" :validate="[range(6, 20), noSpecialChars]" :validateFields="['confirmPassword']">
          <div slot-scope="props">
            <input
              v-on="props.events"
              :name="props.name"
              :value="props.value"
              type="password"
            />
            <span
              class="error"
              v-if="props.meta.touched && props.meta.error">
              {{ props.meta.error }}
            </span>
          </div>
        </FinalField>
        <FinalField name="confirmPassword" :validate="matchedPassword" :validateFields="[]">
          <div slot-scope="props">
            <input
              v-on="props.events"
              :name="props.name"
              :value="props.value"
              type="password"
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
    },

    matchedPassword(value, values) {
      return value === values.password ? null : 'Mismatched password!'
    },

    range(min, max) {
      return value => {
        return value && value.length >= min && value.length <= max ? null : `Password should be between length ${min} and ${max}`
      }
    },

    noSpecialChars(v) {
      return /[!@#$%^&*()]/.test(v) ? 'Please do not use specfial chars' : null
    }
  }
}
</script>
