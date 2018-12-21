<template>
  <div>
    <input v-on="fieldProps.events" :name="fieldProps.name" :value="fieldProps.value" type="email">
    <span
      class="error"
      v-if="fieldProps.meta.touched && fieldProps.meta.error"
    >{{ fieldProps.meta.error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    fieldProps: {
      type: Object,
      required: true
    }
  }
};
</script>

