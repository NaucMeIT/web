export const convertSubtitlesToBlob = (input = '') => {
  const blobSrt = new Blob([input], {
    type: 'text/vtt',
  })

  return window.URL.createObjectURL(blobSrt)
}
