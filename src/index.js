import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function DWChart({ title, src, ...props }) {
  const id = src.split('/').filter((str, i) => str.length === 5 && !!i)

  const [height, setState] = useState(500)

  useEffect(() => {
    function onMessage({ data = {} }) {
      if (typeof data === 'string') return
      const height = data['datawrapper-height'] && data['datawrapper-height'][id]
      if (height) {
        setState(height)
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [id, height, setState])

  return (
    <iframe
      {...props}
      title={title}
      src={src}
      width="100%"
      height={height}
      scrolling="no"
      frameBorder="0"
    />
  )
}

DWChart.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}