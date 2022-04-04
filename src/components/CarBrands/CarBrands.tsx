import React from "react"
import useSwr from "swr"

interface MyApiError {
  message: string
}

interface Props {
  country: string
}

const CarBrands = ({ country }: Props) => {
  const { isValidating, error, data } = useSwr<string[], MyApiError>(
    `/api/cars/${country}`
  )

  return (
    <>
      <h5>Car Brands from {country}</h5>
      {isValidating && !error ? <div>Loading...</div> : null}
      {error ? <div>{error.message}</div> : null}

      {!data?.length && !isValidating && !error ? (
        <div>No Data to Show</div>
      ) : (
        <ul>
          {data?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default CarBrands
