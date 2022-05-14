import React, { useEffect } from "react"
export const useClickOutside = (htmlRef: React.RefObject<HTMLElement>, handle: Function) => {
  console.log('cli')
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!htmlRef.current || htmlRef.current.contains(e.target as HTMLElement)) {
        return
      }
      handle(e)
    }
    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [htmlRef, handle])
}