import { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';

export default class CachedForm extends Component {
  constructor(props) {
    super(props);
    this.useState = props.onState == null;
    if (this.useState) {
      this.state = {
        value: undefined,
        edited: false,
      };
    }
  }
  reportChange(value) {
    let state = { value, edited: value !== undefined };
    if (this.useState) {
      this.setState(state);
    } else {
      this.props.onState(state);
    }
  }
  componentWillReceiveProps(nextProps) {
    // TODO Detect if onState has changed, although it's not really necessary..
  }
  handleChange(changed) {
    const { value } = this.props;
    this.reportChange(deepEqual(value, changed, { strict: true })
      ? undefined : changed);
  }
  reset() {
    this.reportChange(undefined);
  }
  submit() {
    const { onChange } = this.props;
    const state = this.useState ? this.state : (this.props.state || {});
    if (onChange != null) onChange(state.value);
    // Callback order would matter?
    this.reportChange(undefined);
  }
  render() {
    // This is a mess.
    const { children } = this.props;
    const state = this.useState ? this.state : (this.props.state || {});
    const value = state.value === undefined ? this.props.value : state.value;
    const edited = state.edited || false;
    return cloneElement(children, {
      value,
      edited,
      onChange: this.handleChange.bind(this),
      onReset: edited ? this.reset.bind(this) : null,
      onSubmit: edited ? this.submit.bind(this) : null,
    });
  }
}

CachedForm.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  onState: PropTypes.func,
  value: PropTypes.any,
  state: PropTypes.any,
};
