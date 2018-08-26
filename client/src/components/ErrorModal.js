import React, { Component } from 'react'
import ReactDOM from 'react-dom'

let node = null;

class ErrorModal extends Component {
  state = {}
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if(node) {
      ReactDOM.render(<ModalBox {...nextProps} />, node)
    }
    return nextProps;
  }

  componentDidMount(){
    node = document.createElement("div")
    document.body.appendChild(node);
    ReactDOM.render(<ModalBox {...this.props} />, node)
  }

  componentWillUnmount(){
    ReactDOM.unmountComponentAtNode(node)
    node.parentNode && node.parentNode.removeChild(node)
  }

  render(){
    return <script />
  }
}

const ModalBox = (props) => {
  const { error, onClose } = props
  
  return(
    <div className={error ? 'click-catcher--open': 'click-catcher'} onClick={onClose}>
    <div className="modal">
      <h3>{error.name}</h3>
      <p>{error.message}</p>
    </div>
    </div>
  )
}

export default ErrorModal