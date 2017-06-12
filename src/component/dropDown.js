import React, { Component, PropTypes, cloneElement } from 'react';
import classNames from 'classnames';
import Portal from 'react-portal-minimal';

import style from './dropDown.css';

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleClickEvent = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
    this.refs.cover.removeEventListener('click', this.handleClickEvent);
  }
  handleClick(e) {
    const { open } = this.state;
    if (open) {
      this.refs.cover.removeEventListener('click', this.handleClickEvent);
    } else {
      this.refs.cover.addEventListener('click', this.handleClickEvent);
    }
    if (this.mounted) {
      this.setState({
        open: !open,
      });
    }
    e.preventDefault();
  }
  render() {
    const { open } = this.state;
    const buttonContent = (
      <a href={this.props.href || '#'}>
        <span className={style.title}>{this.props.title}</span>
      </a>
    );
    return (
      <div className={classNames(style.dropDown, { [style.open]: open })}>
        <div className={style.cover} ref='cover' />
        <div className={style.button} onClick={this.handleClick.bind(this)}>
          {buttonContent}
        </div>
        { !open && (
          <Portal>
            <div className={style.content}>
              { this.props.preventClose ? (
                this.props.children
              ) : (
                cloneElement(this.props.children, {
                  onClick: this.handleClick.bind(this),
                })
              ) }
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
