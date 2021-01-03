<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',

  components: { MeetupsView },

  data() {
    return {
      view: 'list',
      date: 'all',
      participation: 'all',
      search: '',
    };
  },

  watch: {
    query(query) {
      this.$router.push({ query }).catch(() => {});
    },
    $route: {
      deep: true,
      immediate: true,
      handler(to) {
        for (const key of Object.keys(to.query)) {
          this[key] = to.query[key];
        }
      },
    },
  },

  computed: {
    query() {
      let query = {};

      if (this.view !== 'list') {
        query.view = this.view;
      }

      if (this.date !== 'all') {
        query.date = this.date;
      }

      if (this.participation !== 'all') {
        query.participation = this.participation;
      }

      if (this.search !== '') {
        query.search = this.search;
      }

      return query;
    },
  },
};
</script>

<style scoped></style>
