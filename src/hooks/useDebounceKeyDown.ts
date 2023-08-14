import { RefObject, useEffect, useRef } from 'react'

const useDebouncedKeyDown = (
  event: any,
  callback: (e: KeyboardEvent) => void,
  delay: number,
  element: RefObject<HTMLDivElement> | null
) => {
  const debouncedCallback = useRef<number | undefined>()

  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (!debouncedCallback.current) {
        // Si no hay un tiempo de espera en curso, ejecuta inmediatamente
        callback(e)
      } else {
        clearTimeout(debouncedCallback.current)
      }
      debouncedCallback.current = window.setTimeout(() => {
        debouncedCallback.current = undefined // Reinicia el tiempo de espera
      }, delay)
    }

    if (element) {
      element.current?.addEventListener(event, handleEvent)
    } else {
      document.addEventListener(event, handleEvent)
    }

    return () => {
      if (element) {
        element.current?.removeEventListener(event, handleEvent)
      } else {
        document.removeEventListener(event, handleEvent)
      }

      clearTimeout(debouncedCallback.current)
    }
  }, [callback, delay])
}

export default useDebouncedKeyDown
