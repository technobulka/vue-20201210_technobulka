<template>
  <div class="form-group" :class="{ 'form-group_inline': inline }">
    <label v-if="label.length" class="form-label">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',

  props: {
    label: {
      type: String,
      default: '',
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
  margin-left: 16px;
}

.form-label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
</style>
