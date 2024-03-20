import type { ProductEntity } from '~/types/entities'
import type { VisibilityStatus } from '~/types/enums'

export const useProductRepository = createGlobalState(() => {
  function get(query: { categories?: number[], statuses?: VisibilityStatus[] }) {
    return $api<ProductEntity[]>(`/product`, { query })
  }

  function add(body: Partial<ProductEntity>) {
    return $api(`/product`, {
      method: 'POST',
      body,
    })
  }

  function edit(id: number, body: Partial<ProductEntity>) {
    return $api(`/product/${id}`, {
      method: 'PUT',
      body,
    })
  }

  function publish(id: number) {
    return $api(`/product/${id}/publish`, { method: 'PUT' })
  }

  function draft(id: number) {
    return $api(`/product/${id}/draft`, { method: 'PUT' })
  }

  function archive(id: number) {
    return $api(`/product/${id}/archive`, { method: 'PUT' })
  }

  return {
    get,
    add,
    edit,
    publish,
    draft,
    archive,
  }
})
