import { useState } from "react"
import axios from "axios"

function App() {

  const [linkShow, setLinkShow] = useState(false)
  const [link, setLink] = useState("")

  const fileSharing = async (file: any) => {
    console.log(file)
    let data = new FormData();
    data.append("name", file.name);
    data.append("file", file);
    console.log(data)
    const responce = await axios.post('http://localhost:7777/upload', data)
    const path = await responce.data.path
    setLink(path)
    setLinkShow(true)
  }

  return (
    <div className="w-full h-screen bg-red-400 flex flex-col">
      <header className="w-full h-auto bg-green-300 py-3 px-2">
        <h2 className="text-2xl">File-Sharing</h2>
      </header>
      <main className="w-full h-auto flex-auto bg-slate-600 flex justify-center items-center flex-col">
        <div className="w-[600px] flex items-center justify-center">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input onChange={(e) => {
              fileSharing(e.target.files[0])
            }} id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        {linkShow && (
          <div className="mt-3">
            <a href={link}> {link}</a>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
