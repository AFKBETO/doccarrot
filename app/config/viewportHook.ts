import { useState, useEffect } from "react"

const useViewport = () => {
  const [width, setWidth] = useState((typeof window !== "undefined") ? window.innerWidth: 1000)

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("load", handleWindowResize)
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  // Return the width so we can use it in our components
  return { width }
}

export default useViewport