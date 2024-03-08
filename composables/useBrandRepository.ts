import type { BrandEntity } from '~/types/entities'

export const useBrandRepository = createGlobalState(() => {
  function get() {
    return $api<BrandEntity[]>('/brand')
  }

  function add(body: Partial<BrandEntity>) {
    return $api('/brand', {
      method: 'POST',
      body,
    })
  }

  function edit(id: number, body: Partial<BrandEntity>) {
    return $api(`/brand/${id}`, {
      method: 'PUT',
      body,
    })
  }

  function publish(id: number) {
    return $api(`/brand/${id}/publish`, { method: 'PUT' })
  }

  function draft(id: number) {
    return $api(`/brand/${id}/draft`, { method: 'PUT' })
  }

  function archive(id: number) {
    return $api(`/brand/${id}/archive`, { method: 'PUT' })
  }

  return {
    get,
    add,
    edit,
    publish,
    draft,
    archive
  }
})
