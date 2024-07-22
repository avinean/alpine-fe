export default function useBreadcrumbs(breadcrumbs: MaybeRefOrGetter<({ label: string, to: string } | { label: string })[]>) {
  const global = useGlobalStore()
  console.log('useBreadcrumbs', breadcrumbs)
  global.breadcrumbs = toValue(breadcrumbs)

  onBeforeRouteLeave(() => {
    global.breadcrumbs = []
  })
}
