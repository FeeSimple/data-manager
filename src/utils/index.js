export const idFromPath = (pathname) => {
  return pathname.substring(pathname.lastIndexOf('/')+1,pathname.length)
}
