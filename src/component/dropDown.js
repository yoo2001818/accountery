import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from 'react-portal-minimal';

import style from './dropDown.css';

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      x: 0,
      y: 0,
    };
    this.layoutValid = false;
    this.root = null;
    this.node = null;
    this.cover = null;
  }
  componentDidMount() {
    this.mounted = true;
    if (this.state.open) this.calcLayout();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentDidUpdate() {
    if (this.state.open) this.calcLayout();
  }
  registerRoot(root) {
    this.root = root;
  }
  registerNode(node) {
    this.node = node;
  }
  registerCover(cover) {
    // Cover will disappear right after closing - we don't need to handle
    // closing events.
    if (this.cover !== cover && cover != null) {
      this.cover = cover;
      cover.addEventListener('click', this.handleClick.bind(this));
    }
  }
  calcLayout() {
    // Don't do layout if one of the nodes are missing.
    if (this.root == null || this.node == null) return;
    let { innerWidth, innerHeight } = window;
    this.layoutValid = true;
    let x, y;
    let nodeRect = this.node.getBoundingClientRect();
    let alignRect = this.root.getBoundingClientRect();
    // We need this to get exact location of the node...
    let body = document.body;
    let docEl = document.documentElement;
    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;
    let diffTop = scrollTop - clientTop;
    let diffLeft = scrollLeft - clientLeft;
    if (this.props.top) {
      y = alignRect.top + diffTop - nodeRect.height;
      if (y < 0) {
        y = Math.min(innerHeight - nodeRect.height, alignRect.bottom + diffTop);
      }
    } else {
      y = alignRect.bottom + diffTop;
      if (y + nodeRect.height > innerHeight + diffTop) {
        y = Math.max(0, alignRect.top + diffTop - nodeRect.height);
      }
    }
    x = alignRect.left + diffLeft;
    if (x + nodeRect.width > innerWidth + diffLeft) {
      x = Math.max(0, alignRect.right + diffLeft - nodeRect.width);
    }
    this.setState({ x, y });
  }
  handleClick(e) {
    const { open } = this.state;
    if (this.mounted) {
      this.setState({
        open: !open,
      });
      this.layoutValid = false;
    }
    e.preventDefault();
  }
  render() {
    const { open, x, y } = this.state;
    const { title, children, preventClose } = this.props;
    return (
      <div className={classNames(style.dropDown, { [style.open]: open })}
        ref={this.registerRoot.bind(this)}
      >
        <button className={style.button} onClick={this.handleClick.bind(this)}>
          { title }
        </button>
        { open && (
          <Portal>
            <div className={style.dropDownPortal} style={{
              position: 'absolute',
              left: x + 'px',
              top: y + 'px',
            }}>
              <div className={style.cover}
                ref={this.registerCover.bind(this)} />
              <div className={style.content} ref={this.registerNode.bind(this)}>
                { preventClose ? (
                  children
                ) : (
                  cloneElement(children, {
                    onClick: this.handleClick.bind(this),
                  })
                ) }
              </div>
            </div>
          </Portal>
        ) }
      </div>
    );
  }
}

DropDown.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node,
  preventClose: PropTypes.bool,
};
