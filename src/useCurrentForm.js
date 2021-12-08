import { inject } from 'vue'

const useCurrentForm = () => {
  const finalForm = inject('finalForm')

  if (!finalForm) {
    throw new Error('Form was\'t found. Please provide it using `<FinalForm>` component or `useForm` hook.')
  }

  return finalForm
}

export default useCurrentForm
