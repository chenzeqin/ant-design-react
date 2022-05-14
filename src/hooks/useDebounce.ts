import { useEffect, useState } from "react"

export const useDebounce = (value: any, delay: number = 300) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    // value变化，就清空重新计时
    return () => {
      clearTimeout(handler)
    }
  }, [value])
  return debounceValue
}