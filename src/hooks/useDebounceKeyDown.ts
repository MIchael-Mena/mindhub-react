import { RefObject, useEffect, useRef } from 'react'

const useDebouncedKeyDown = (
  event: string,
  callback: (e: KeyboardEvent) => void,
  delay: number,
  element: RefObject<HTMLElement> | null = null
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

    const targetElement = element ? element.current : document

    targetElement?.addEventListener(event, handleEvent as EventListener)

    return () => {
      targetElement?.removeEventListener(event, handleEvent as EventListener)
      clearTimeout(debouncedCallback.current)
    }
  }, [callback, delay, element, event])
}

export default useDebouncedKeyDown
