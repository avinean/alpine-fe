import type { Component } from 'vue'
import type { Props } from '~/types/utils'

export const useModalStore = defineStore('modal', () => {
  const configs = ref<{
    component: Component
    props?: Record<string, any>
  }[]>([])

  function open<T extends Component>(component: T, props?: Props<T>) {
    configs.value.push({
      component: markRaw(component),
      props,
    })
  }

  function close() {
    configs.value.pop()
  }

  return {
    configs,
    open,
    close,
  }
})
