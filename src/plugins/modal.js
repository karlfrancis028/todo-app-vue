const modalPlugin = {
  install(Vue) {
    Vue.prototype.$modal = new Vue({
      data() {
        return {
          isOpen: false,
        }
      },
      methods: {
        open({ component: ModalComponent = Modal, props = {}, events = {} } = {}) {
          const ModalConstructor = Vue.extend(ModalComponent);
          const modalInstance = new ModalConstructor({
            propsData: {
              ...props,
            },
          });
          modalInstance.$mount();

          document.body.append(modalInstance.$el);
          this.isOpen = true;
          Object.entries(events).forEach(([eventName, eventHandler]) => {
            modalInstance.$on(eventName, eventHandler);
          })
        },
        close() {
          this.isOpen = false;
          const modalElement = document.querySelector('.modal');
          modalElement?.remove();
        },
      },
    })
  }
}

export default modalPlugin;
