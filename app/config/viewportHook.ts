import { useState, useEffect } from "react"

const useViewport = () => {
  const [width, setWidth] = useState((typeof window !== "undefined") ? window.innerWidth: 1000)
  const [height, setHeight] = useState((typeof window !== "undefined") ? window.innerHeight: 600)

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener("load", handleWindowResize)
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  // Return the width so we can use it in our components
  return { width, height }
}

export default useViewport