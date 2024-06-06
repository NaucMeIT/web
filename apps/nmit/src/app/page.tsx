const acceptedFileTypes =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.presentation,text/html,image/x-png,image/jpeg,image/gif'
export default function Index() {
  return (
    <div>
      <form action='/api/quiz' method='POST' encType='multipart/form-data'>
        <input type='file' id='file' name='file' accept={acceptedFileTypes} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
