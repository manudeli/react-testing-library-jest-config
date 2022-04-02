import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Photo } from "../../models/Photo"
import Image from "next/image"

export const PhotoList = () => {
  const [refresh, setRefresh] = useState(0)
  const [name, setName] = useState("")

  return (
    <div>
      <button onClick={() => setRefresh((cr) => ++cr)}>Refresh</button>
      <div>
        <label>
          Your Name:
          <input
            name="Your name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </label>
        <List refresh={refresh} name={name} />
      </div>
    </div>
  )
}

const List = ({ refresh, name }: { refresh: number; name: string }) => {
  const [loading, setLoading] = useState(0)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [error, setError] = useState("")

  const load = async () => {
    setLoading((l) => l + 1)

    try {
      const { data } = await axios.get<Photo[]>(`/api/photos?name=${name}`)
      setError("")
      setPhotos(data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response as AxiosResponse<{ message: string }>
        setError(data.message)
      }
    } finally {
      setLoading((l) => l - 1)
    }
  }

  useEffect(() => {
    void load()
  }, [refresh, name])

  return (
    <div>
      <div>
        {error ? <div>{error}</div> : null}
        {loading ? <div>Loading...</div> : null}
      </div>

      {photos.map((photo) => (
        <PhotoDetail photo={photo} key={photo.id} />
      ))}
    </div>
  )
}

const PhotoDetail = ({ photo }: { photo: Photo }) => {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setFavorite(false)
  }, [photo])

  return (
    <div>
      <Image
        src={photo.thumbnailUrl}
        aria-label={photo.title}
        width={150}
        height={150}
      />
      <div>
        <h2>{photo.title}</h2>
        <h3>PhotoId: {photo.id}</h3>

        <button
          onClick={async () => {
            const { data } = await axios.post<Photo>("/api/favorite", {
              ...photo,
              favorite,
            })
            setFavorite(data.favorite)
          }}
        >
          {favorite ? "Remove from Favorites" : "Add To Favorites"}
        </button>
      </div>
    </div>
  )
}
