import type { CategoryEntity } from '~/types/entities'
import type { VisibilityStatus } from '~/types/enums'

export const useCategoryRepository = createGlobalState(() => {
  function get(query: { brands: number[], statuses?: VisibilityStatus[] }) {
    return $api<CategoryEntity[]>(`/category`, { query })
  }

  function getOne(categoryIdOrSlug: number | string) {
    return $api<CategoryEntity>(`/category/${categoryIdOrSlug}`)
  }

  function add(brandId: number, body: Partial<CategoryEntity>) {
    return $api(`/category/${brandId}`, {
      method: 'POST',
      body,
    })
  }

  function edit(id: number, body: Partial<CategoryEntity>) {
    return $api(`/category/${id}`, {
      method: 'PUT',
      body,
    })
  }

  function publish(id: number) {
    return $api(`/category/${id}/publish`, { method: 'PUT' })
  }

  function draft(id: number) {
    return $api(`/category/${id}/draft`, { method: 'PUT' })
  }

  function archive(id: number) {
    return $api(`/category/${id}/archive`, { method: 'PUT' })
  }

  return {
    get,
    getOne,
    add,
    edit,
    publish,
    draft,
    archive,
  }
})
