export const vBaseDirective = {
  beforeMount: (el, binding) => {
    console.log(el);
    console.log(binding.arg);
    console.log(binding.value);
    console.log(binding.modifiers);
  },
  /*created(el, binding, vnode, prevVnode) {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {}*/
};
