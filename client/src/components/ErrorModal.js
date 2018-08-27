import React, { Component } from "react";
import ReactDOM from "react-dom";

/*
* We return a script tag so that React has something to reference in the
* tree. However, we create a node and reactDOM render onto it so that
* it is independent of the rest of the tree. We need to create, append
* node only once, we do it in componentDidMount. On every props change, 
* after update, we call reactRender again with new props.
* 
* componentWillUnmount contains a bug fix where new nodes were unnecessarily
* appended.
 */

let node = null;

class ErrorModal extends Component {

  componentDidUpdate(){
      ReactDOM.render(<ModalBox {...this.props} />, node)
  
  }

  componentDidMount(){
    node = document.createElement("div")
    document.body.appendChild(node);
  }
  

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(node);
    node.parentNode && node.parentNode.removeChild(node);
  }

  render() {
    return <script />;
  }
}

const ModalBox = props => {
  const { error, onClose } = props;

  return (
    <div
      className={error ? "click-catcher--open" : "click-catcher"}
      onClick={onClose}
    >
      <div className="modal">
        <h3>{error.name}</h3>
        <p>{error.message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
