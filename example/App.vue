<template>
  <div id="app">
    <select
      class="component-list"
      v-model="current">
      <option value="">Select an example</option>
      <option
        class="component-item"
        v-for="item in list"
        :value="item"
        :key="item">
        {{ item }}
      </option>
    </select>
    <hr>
    <component
      v-if="$route.query.component"
      :is="$route.query.component" />
  </div>
</template>

<script>
import Simple from './examples/Simple.vue'

export default {
  data() {
    return {
      list: [
        'Simple'
      ],
      current: this.$route.query.component || ''
    }
  },

  watch: {
    current() {
      this.$router.push({
        query: {
          component: this.current
        }
      })
    }
  },

  components: {
    Simple
  }
}
</script>

<style>
.error {
  color: red;
}
</style>

<style scoped>
.component-item {
  cursor: pointer;
}
</style>
