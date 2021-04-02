export const getParametersAsStringArray = (params: any): string[] => {
  if (!params) return []
  if (typeof params === 'string') return params.split(',')
  if (params instanceof Array) return params.map(p => p?.toString())
  return []
}
