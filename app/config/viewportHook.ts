import { useState, useEffect } from "react"

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [size, setSize] = useState<'big' | 'med' | 'small'>('big')
  const medSize = 900
  const smallSize = 600

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)
    if (width < smallSize) setSize('small')
    else if (width < medSize) setSize('med')
    else setSize('big')
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  // Return the width so we can use it in our components
  return { size }
}

export default useViewport