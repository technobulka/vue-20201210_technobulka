<template>
  <div id="app">
    <base-layout>
      <router-view />
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from './components/BaseLayout';
export default {
  name: 'App',
  components: { BaseLayout },
};
</script>

<style scoped></style>
