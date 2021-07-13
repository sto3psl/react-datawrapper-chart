import React from 'react'
import PropTypes from 'prop-types'

export default class DWChart extends React.Component {

  constructor(props) {
    super(props);
    this.iframeRef = React.createRef();
    this.state = {
      height: 500
    }
  }

  componentDidMount() {
      window.addEventListener('message', this.onMessage.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener('message', this.onMessage.bind(this));
  }

  onMessage({data = {}, source}) {
    const id = this.props.src.split('/').filter((str, i) => str.length === 5 && !!i);
    if (typeof data === 'string') return;
    if (source === this.iframeRef.current.contentWindow) {
      const height = data['datawrapper-height'] && data['datawrapper-height'][id]
      if (height) {
        this.setState({height})
      }
    }
  }

  render() {
    const { title, src, ...props } = this.props;

    return (
      <iframe
        ref={this.iframeRef}
        scrolling="no"
        frameBorder="0"
        width="100%"
        {...props}
        title={title}
        src={src}
        height={this.state.height}
      />
    )
  }
}

DWChart.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  loading: PropTypes.oneOf(['eager', 'lazy']),
}
