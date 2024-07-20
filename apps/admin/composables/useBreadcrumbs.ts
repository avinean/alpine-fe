export default function useBreadcrumbs(breadcrumbs: MaybeRefOrGetter<({ label: string, to: string } | { label: string })[]>) {
  const global = useGlobalStore()
  global.breadcrumbs = toValue(breadcrumbs)
  
  onBeforeRouteLeave(() => {
    global.breadcrumbs = []
  })
}
