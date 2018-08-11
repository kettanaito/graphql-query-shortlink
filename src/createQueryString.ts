export default function createQueryString(obj: Object) {
  return Object.keys(obj)
    .reduce((parts, propName) => {
      return parts.concat(`${propName}=${obj[propName]}`)
    }, [])
    .join('&')
}
