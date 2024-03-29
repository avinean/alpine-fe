import type { ServiceEntity } from '~/types/entities'
import type { VisibilityStatus } from '~/types/enums'

export const useServiceRepository = createGlobalState(() => {
  function get(query: { statuses?: VisibilityStatus[] }) {
    return $api<ServiceEntity[]>(`/service`, { query })
  }

  function add(body: Partial<ServiceEntity>) {
    return $api(`/service`, {
      method: 'POST',
      body,
    })
  }

  function edit(id: number, body: Partial<ServiceEntity>) {
    return $api(`/service/${id}`, {
      method: 'PUT',
      body,
    })
  }

  function publish(id: number) {
    return $api(`/service/${id}/publish`, { method: 'PUT' })
  }

  function draft(id: number) {
    return $api(`/service/${id}/draft`, { method: 'PUT' })
  }

  function archive(id: number) {
    return $api(`/service/${id}/archive`, { method: 'PUT' })
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
