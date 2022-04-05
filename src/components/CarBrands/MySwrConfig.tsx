import React, { ReactNode } from "react"
import { SWRConfig, Cache } from "swr"
import { Fetcher, PublicConfiguration } from "swr/dist/types"

export const MySwrConfig = ({
  children,
  swrConfig,
}: {
  children?: ReactNode
  swrConfig?: Partial<PublicConfiguration<any, any, Fetcher<any>>> & {
    provider?: (cache: Readonly<Cache<any>>) => Cache<any>
  }
}) => {
  return (
    <SWRConfig value={{ fetcher: customFetcher, ...swrConfig }}>
      {children}
    </SWRConfig>
  )
}

export const customFetcher = async (url: string) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const json = (await res.json()) as { message: string }
    throw new Error(json.message)
  }

  return res.json()
}
