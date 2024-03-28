<script setup lang="ts">
import type { ContactEntity } from '~/types/entities'
import { VisibilityStatus } from '~/types/enums'

const statuses = ref<VisibilityStatus[]>([
  VisibilityStatus.Published,
  VisibilityStatus.Draft,
])
const toast = useToast()
const { get, add, edit, publish, draft, archive } = useContactRepository()
const { data, refresh } = useAsyncData(
  () => get({ statuses: statuses.value.join(',') }),
  { watch: [statuses] },
)

const loading = ref()
const contact = ref<Partial<ContactEntity> | null>(null)
const edittingId = ref<number | null>(null)

function callAddEdit(preset?: Partial<ContactEntity>) {
  edittingId.value = preset?.id || null
  contact.value = {
    address: preset?.address || undefined,
    phones: preset?.phones || undefined,
    emails: preset?.emails || undefined,
  }
}

async function onCreateOrUpdate() {
  loading.value = true

  try {
    if (edittingId.value)
      await edit(edittingId.value, contact.value!)
    else
      await add(contact.value!)
    refresh()
    contact.value = null
    edittingId.value = null
  }
  catch (error: any) {
    toast.add({
      title: 'Не вдалось додати/змінити контакт',
      description: error.message,
    })
  }
  finally {
    loading.value = false
  }
}

function validate(state: ContactEntity) {
  const errors = []

  if (!state.address)
    errors.push({ path: 'address', message: 'Обовʼязкове поле' })

  return errors
}
</script>

<template>
  <div class="space-y-2">
    <ContactsRegular />
    <ContactsTelegram />
  </div>
</template>
