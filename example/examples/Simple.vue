<template>
  <div>
    <FinalForm :submit="handleSubmit" @change="updateState">
      <form slot-scope="props" @submit="props.handleSubmit">
        <FinalField name="email" :validate="required">
          <div slot-scope="props">
            <input
              v-on="props.events"
              :name="props.name"
            />
            <span
              class="error"
              v-if="props.meta.touched && props.meta.error">
              {{ props.meta.error }}
            </span>
          </div>
        </FinalField>
        <button type="submit">Submit</button>
      </form>
    </FinalForm>

    <pre v-if="formState"><code>form state:<br><br>{{ JSON.stringify(formState, null, 2) }}</code></pre>
  </div>
</template>

<script>
import { FinalForm, FinalField } from 'vue-finalform'

export default {
  components: {
    FinalForm,
    FinalField
  },

  data() {
    return {
      formState: null
    }
  },

  methods: {
    handleSubmit(state) {
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
