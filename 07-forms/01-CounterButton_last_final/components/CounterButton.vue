<template>
  <button @click="increment">{{ count_ }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  data() {
    return {
      count_: this.count,
    };
  },

  watch: {
    count() {
      this.count_ = this.count;
    },
  },

  methods: {
    increment() {
      this.$emit('increment', ++this.count_);
    },
  },
};
</script>

<style></style>
