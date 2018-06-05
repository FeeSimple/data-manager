export const idFromPath = (pathname) => {
  const result = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
  return result === ''?'-1':result
}
