import { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

export default class CachedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      edited: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.edited) return;
    this.setState({
      value: nextProps.value,
    });
  }
  handleChange(value) {
    // TODO Should run deep equal test to check if the user has inserted
    // exactly same value as before. 
    const { onStatus } = this.props;
    if (onStatus != null) onStatus({ edited: true });
    this.setState({
      value,
      edited: true,
    });
  }
  reset() {
    const { onStatus } = this.props;
    if (onStatus != null) onStatus({ edited: false });
    this.setState({
      value: this.props.value,
      edited: false,
    });
  }
  submit() {
    const { onChange, onStatus } = this.props;
    if (onChange != null) onChange(this.state.value);
    if (onStatus != null) onStatus({ edited: false });
    this.setState({
      edited: false,
    });
  }
  render() {
    const { children } = this.props;
    const { value, edited } = this.state;
    return cloneElement(children, {
      value,
      edited,
      onChange: this.handleChange.bind(this),
      onReset: edited && this.reset.bind(this),
      onSubmit: edited && this.submit.bind(this),
    });
  }
}

CachedForm.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  onStatus: PropTypes.func,
  value: PropTypes.any,
};
