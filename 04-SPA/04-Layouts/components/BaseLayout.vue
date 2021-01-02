<template>
  <div>
    <the-header />

    <main class="main">
      <router-view />
    </main>

    <the-footer />
  </div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';

export default {
  name: 'BaseLayout',

  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>

<style>
@media all and (max-width: 992px) {
  .container {
    padding: 0 16px;
  }
}
</style>
