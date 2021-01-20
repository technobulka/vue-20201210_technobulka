<script>
export default {
  name: 'NodesPagination',

  render(h) {
    const begin = (this.$props.page - 1) * this.$props.perPage;
    const end = begin + this.$props.perPage;

    let content = '';

    if (this.$slots.default) {
      content = this.$slots.default.slice(begin, end);
    }

    return h('div', content);
  },

  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 10,
    },
  },
};
</script>

<style scoped></style>
