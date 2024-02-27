import { useEffect, useState } from 'react'

function useMouse() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  function mouseMoveHanlder(e: MouseEvent) {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHanlder)

    return () => {
      window.removeEventListener('mousemove', mouseMoveHanlder)
    }
  }, [])

  return { x, y }
}

export default useMouse
