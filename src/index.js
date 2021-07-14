import React, { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

export default function DWChart({ title, src, ...props }) {
  const iframeRef = useRef()
  const [height, setState] = useState(500)

  const onMessage = useCallback(
    ({ data = {}, source }) => {
      if (
        source !== iframeRef.current.contentWindow ||
        typeof data === 'string' ||
        !data['datawrapper-height']
      )
        return

      setState(Object.values(data['datawrapper-height'])[0])
    },
    [setState, iframeRef]
  )

  useEffect(() => {
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [height, setState, onMessage])

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
