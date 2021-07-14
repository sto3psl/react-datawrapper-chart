import React, { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

export default function DWChart({ title, src, ...props }) {
  const id = src.split('/').filter((str, i) => str.length === 5 && !!i)
  const iframeRef = useRef()
  const [height, setState] = useState(500)

  const onMessage = useCallback(
    ({ data = {}, source }) => {
      if (typeof data === 'string' || source !== iframeRef.current.contentWindow) return

      const height = data['datawrapper-height'] && data['datawrapper-height'][id]
      if (height) {
        setState(height)
      }
    },
    [id, setState, iframeRef]
  )

  useEffect(() => {
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [id, height, setState, onMessage])

  return (
    <iframe
      ref={iframeRef}
      scrolling="no"
      frameBorder="0"
      width="100%"
      {...props}
      title={title}
      src={src}
      height={height}
    />
  )
}

DWChart.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  loading: PropTypes.oneOf(['eager', 'lazy']),
}
