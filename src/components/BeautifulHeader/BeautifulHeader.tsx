import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const BeautifulHeader = () => {
  const { query, push, pathname, basePath } = useRouter()

  const queryId = String(query.id)

  const handleClick = async () => {
    await push(`/contacts?id=${queryId}&from=${pathname}&something=${basePath}`)
  }

  return (
    <div>
      <h1>Todo ID: {queryId}</h1>
      <Link href={`/contacts/?id=${queryId}&from=${pathname}`}>
        Contacts Page
      </Link>
      <button onClick={handleClick}>Some Action</button>
    </div>
  )
}

export default BeautifulHeader
