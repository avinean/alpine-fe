import type { CategoryEntity } from '~/types/entities'

export const useCategoryRepository = createGlobalState(() => {
  function get(query: { brands: number[], published?: boolean }) {
    return $api<CategoryEntity[]>(`/category`, { query })
  }

  function getOne(categoryId: number) {
    return $api<CategoryEntity>(`/category/${categoryId}`)
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