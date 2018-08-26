import React, { Component } from 'react'
import ReactDOM from 'react-dom'

/**
 * The react tree refers to the script tag the higher level component
 * returns. It simply serves as a node to appendchild our real modal
 * box to, which receives props from the parent. That we need a 
 * parent node, but it must not have styling, is why we return
 * a script tag.
 * 
 * ModalBox returns a click catcher that wraps the display div. It takes up
 * the entire viewport when state.error is truthy, and simply returns state.error = ''
 * when clicked, which flips the display att from flex back to none.
 * 
 * The ModalBox is always rendered, it's styling is simply correlated to the
 * truthiness of a state.error. That we render a new node is simply to avoid
 * its display being affected by the react tree, though we still need to have 
 * a reference in the tree.
 */

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