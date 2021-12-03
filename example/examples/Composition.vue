<template>
  <div>
    <form @submit.prevent="finalForm.submit">
      <div>
        <input
          :name="emailField.name"
          :value="emailField.value"
          v-on="emailField.events"
          type="email"
        />
        <span
          class="error"
          v-if="emailField.touched && emailField.error">
          {{ emailField.error }}
        </span>
      </div>
      <div>
        <input
          :name="passwordField.name"
          :value="passwordField.value"
          v-on="passwordField.events"
          type="password"
        />
        <span
          class="error"
          v-if="passwordField.touched && passwordField.error">
          {{ passwordField.error }}
        </span>
      </div>
      <div>
        <input
          :name="confirmPasswordField.name"
          :value="confirmPasswordField.value"
          v-on="confirmPasswordField.events"
          type="password"
        />
        <span
          class="error"
          v-if="confirmPasswordField.touched && confirmPasswordField.error">
          {{ confirmPasswordField.error }}
        </span>
      </div>

      <button type="submit" :disabled="formState.submitting || null">
        {{ formState.submitting ? 'Submitting' : 'Submit' }}
      </button>
    </form>

    <pre v-if="formState"><code>form state:<br><br>{{ JSON.stringify(formState, null, 2) }}</code></pre>
  </div>
</template>

<script setup>
import { useForm, useField } from 'vue-final-form'

function sleep(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

const required = v =>
  v ? null : 'This field is required!'

const matchedPassword = (value, values) =>
  value === values.password ? null : 'Mismatched password!'

const range = (min, max) =>
  value =>
    value && value.length >= min && value.length <= max ? null : `Password should be between length ${min} and ${max}`

const noSpecialChars = (v) =>
  /[!@#$%^&*()]/.test(v) ? 'Please do not use special chars' : null

const initialValues = {
  email: 'egoist@boring.com',
}

const handleSubmit = async state => {
  await sleep(2000)
  console.log(state)
}

const { finalForm, formState } = useForm({
  initialValues,
  onSubmit: handleSubmit,
})

const { fieldState: emailField } = useField({
  finalForm,
  name: 'email',
  validate: required,
})

const { fieldState: passwordField } = useField({
  finalForm,
  name: 'password',
  validate: [range(6, 20), noSpecialChars],
})

const { fieldState: confirmPasswordField } = useField({
  finalForm,
  name: 'confirmPassword',
  validate: matchedPassword,
})
</script>
