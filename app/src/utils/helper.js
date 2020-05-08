export const IsValidJSONString = str => {
  try {
    JSON.parse(str)
  } catch (error) {
    return false
  }
  return true
}
