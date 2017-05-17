export const transformImage = (imageComponents) => {
  return `${imageComponents.path}.${imageComponents.extension}`.replace(/^http/, 'https')
}
