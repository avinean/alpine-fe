export function usePhoto(name?: string) {
  const toast = useToast()
  const photo = ref()

  function add() {
    if (photo.value) {
      try {
        const body = new FormData()
        body.append('photo', photo.value)

        photo.value = null

        const endpoint = name ? `/util/photo/${name}` : '/util/photo'
        const method = name ? 'PUT' : 'POST'

        return $api<string>(endpoint, {
          method,
          body,
        })
      }
      catch (e) {
        toast.add({
          title: 'Error',
          description: 'Не вдалось завантажити фото',
        })
      }
    }
  }

  return {
    photo,
    add,
  }
}
