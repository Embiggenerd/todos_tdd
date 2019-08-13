import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

/*
* We return a script tag so that React has something to reference in the
* tree. However, we create a node and reactDOM render onto it so that
* it is independent of the rest of the tree. We need to create, append
* node only once, we do it in componentDidMount. On every props change, 
* after update, we call reactRender again with new props.
* 
* componentWillUnmount contains a bug fix where new nodes were unnecessarily
* appended when <Loading/> component is mounted and layout tree is unmounted

* We specifiy a shouldComponentUpdate in this case because react does not 
* compare props when deciding to update, it only checks if there is an update.
* Since the reference for this is in the layout tree, and the props are passed
* when that tree is rerendered on its update, our props register an update.
* We compare relevant props to mitigate this inefficiency. 
* 
 */

let node = null;

class ModalWrapper extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.error !== nextProps.error) {
      return true;
    }
    return false;
  }
  componentDidUpdate() {
    const { error, onClose } = this.props;
    ReactDOM.render(
      <Modal onClose={onClose} name={error.name} message={error.message} />,
      node
    );
  }

  componentDidMount() {
    node = document.createElement('div');
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

export default ModalWrapper;
