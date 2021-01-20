<script>
export default {
  name: 'FadeTransitionGroup',

  inheritAttrs: false,

  render(h) {
    let data = {
      class: {
        'fade-list': true,
      },
      attrs: {
        ...this.$attrs,
        name: 'fade-list',
      },
      on: this.$listeners,
    };

    if (this.$slots.default) {
      this.$slots.default.map((el) => {
        if (el.data.class) {
          el.data.class['fade-list-item'] = true;
        } else {
          el.data.class = {
            'fade-list-item': true,
          };
        }

        if (el.data.staticClass) {
          el.data.class[el.data.statcClass] = true;
        }
      });
    }

    return h('transition-group', data, this.$slots.default);
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
