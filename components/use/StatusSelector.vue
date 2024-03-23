<script lang="ts" setup>
import { VisibilityStatus } from '~/types/enums'

const props =defineProps<{
  query?: boolean
}>()

const router = useRouter()
const route = useRoute()

const _model = defineModel<VisibilityStatus[]>({
  default: () => [],
})

const selectedStatuses = computed({
  get() {
    return (route.query.statuses?.toString()?.split(',').map(String) || [
      VisibilityStatus.Published,
      VisibilityStatus.Draft,
    ]) as VisibilityStatus[]
  },
  set(statuses: VisibilityStatus[]) {
    router.replace({
      query: {
        ...route.query,
        statuses: statuses.length ? statuses.join(',') : undefined,
      },
    })
  },
})

const model = computed({
  get() {
    return props.query ? selectedStatuses.value : _model.value
  },
  set(statuses: VisibilityStatus[]) {
    (props.query ? selectedStatuses : _model).value = statuses
  }
})


const options = [
  {
    id: VisibilityStatus.Published,
    label: 'Опублікований',
    icon: 'i-heroicons-eye-solid'
  },
  {
    id: VisibilityStatus.Draft,
    label: 'Чорновик',
    icon: 'i-heroicons-eye-slash-solid'
  },
  {
    id: VisibilityStatus.Archived,
    label: 'Архівований',
    icon: 'i-heroicons-folder-minus-16-solid'
  },
]
</script>

<template>
  <USelectMenu
    v-model="model"
    :options="options"
    option-attribute="label"
    value-attribute="id"
    multiple
    placeholder="Select people"
  />
</template>
