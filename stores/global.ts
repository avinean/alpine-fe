import { VisibilityStatus } from '~/types/enums'

export const useGlobalStore = defineStore('global', () => {
  const isLoggedIn = ref(false)
  const isPreview = ref(false)
  const statuses = computed(() => isPreview.value
    ? [VisibilityStatus.Published, VisibilityStatus.Draft]
    : [VisibilityStatus.Published],
  )

  async function checkLogin() {
    if (isLoggedIn.value)
      return isLoggedIn.value
    try {
      await $api('/auth/me')
      isLoggedIn.value = true
    }
    catch (e) {
      isLoggedIn.value = false
    }
    return isLoggedIn.value
  }

  const { get } = useContactRepository()
  const { data: contacts } = useAsyncData(
    () => get({ statuses: statuses.value }),
    { watch: [statuses] },
  )

  return {
    checkLogin,
    isLoggedIn,
    isPreview,
    statuses,
    contacts
  }
})
