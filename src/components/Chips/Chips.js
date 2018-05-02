//
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Chips.css';

class Chips extends Component {

  static defaultProps = {
    placeholder: 'Add a chip...',
    maxlength: 20
  };

  state = {
    chips: [],
    KEY: {
      backspace: 8,
      tab: 9,
      enter: 13
    },
    // only allow letters, numbers and spaces inbetween words
    INVALID_CHARS: /[^a-zA-Z0-9 ]/g
  };

  componentDidMount() {
    this.setChips(this.props.chips);
  }

  componentWillReceiveProps(nextProps) {
    this.setChips(nextProps.chips);
  }

  setChips(chips) {
    if (chips !== undefined) this.setState({ chips });
  }

  onKeyDown(event, onChange) {
    let keyPressed = event.which;

    if (keyPressed === this.state.KEY.enter ||
      (keyPressed === this.state.KEY.tab && event.target.value)) {
      event.preventDefault();
      this.updateChips(event, onChange);
    } else if (keyPressed === this.state.KEY.backspace) {
      let chips = this.state.chips;

      if (!event.target.value && chips.length) {
        this.deleteChip(chips[chips.length - 1], onChange);
      }
    }
  }

  clearInvalidChars(event) {
    let value = event.target.value;

    if (this.state.INVALID_CHARS.test(value)) {
      event.target.value = value.replace(this.state.INVALID_CHARS, '');
    } else if (value.length > this.props.maxlength) {
      event.target.value = value.substr(0, this.props.maxlength);
    }
  }

  updateChips(event, onChange) {
    if (!this.props.max ||
      this.state.chips.length < this.props.max) {
      let value = event.target.value;

      if (!value) return;

      let chip = value.trim().toLowerCase();

      if (chip && this.state.chips.indexOf(chip) < 0) {
        onChange([...this.state.chips, chip]);
      }
    }

    event.target.value = '';
  }

  deleteChip(chip, onChange) {
    //console.log(this.state.chips.filter(element => chip !== element));
    onChange(this.state.chips.filter(element => chip !== element));
  }

  focusInput(event) {
    let children = event.target.children;

    if (children.length) children[children.length - 1].focus();
  }

  render() {
    let chips = this.state.chips.map((chip, index) => {
      return (
        <span className="chip" key={index} >
          <span className="chip-value" >{chip}</span >
          <button type="button" className="chip-delete-button" onClick={() => this.deleteChip(chip, this.props.onChange)} >x</button >
        </span >
      );
    });

    let placeholder = !this.props.max || chips.length < this.props.max ? this.props.placeholder : '';

    return (
      <div className="chips" onClick={this.focusInput.bind(this)} >
        {chips}
        <input type="text" className="chips-input" placeholder={placeholder}
               onKeyDown={(event) => this.onKeyDown(event, this.props.onChange)}
               onKeyUp={this.clearInvalidChars.bind(this)} />
      </div >
    );
  }
};

Chips.propTypes = {
  chips: PropTypes.array,
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  maxlength: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  placeholder: PropTypes.string
};

export default Chips;