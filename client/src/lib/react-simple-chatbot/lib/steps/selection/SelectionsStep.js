import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Selection from './Selection';
import SelectionElement from './SelectionElement';
import Selections from './Selections';
import SelectionsStepContainer from './SelectionsStepContainer';

class SelectionsStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.renderSelection = this.renderSelection.bind(this);
    this.onSelectionClick = this.onSelectionClick.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  onSelectionClick({ value }) {
    console.log("onSelectionClick");
    console.log(value);
    console.log(JSON.stringify(value));
    this.props.triggerNextStep({ value });
  }

  handleSelectionChange(event) {
    console.log("handleSelectionChanged");
    console.log(event.target.value);
    if (event.target.value) {
      this.props.triggerNextStep({ value: event.target.value });
    } 
  }

  renderSelection(option) {
    console.log("renderSelection");
    const { bubbleStyle } = this.props;
    const { user } = this.props.step;
    const { value, label } = option;
    console.log("value is : " + value);

    return (
      <Selection key={value} value={value} className="rsc-os-option">
        <SelectionElement
          className="rsc-os-option-element"
          style={bubbleStyle}
          user={user}
          onClick={() => this.onSelectionClick({ value })}
        >
          {label}
        </SelectionElement>
      </Selection>
    );
  }

  render() {
    const { selections } = this.props.step;
    const { bubbleStyle } = this.props;
    const { user } = this.props.step;

    return (
      <SelectionsStepContainer className="rsc-os">
        <Selections
          className="rsc-os-options"
          onChange={this.handleSelectionChange}
        >
          <Selection
            key={0}
            value={0}
            className="rsc-os-option"
            selected="selected"
          >
            <SelectionElement
              className="rsc-os-option-element"
              style={bubbleStyle}
              user={user}
            >
              Select township
            </SelectionElement>
          </Selection>
          {_.map(selections, this.renderSelection)}
        </Selections>
      </SelectionsStepContainer>
    );
  }
}

SelectionsStep.propTypes = {
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  bubbleStyle: PropTypes.object.isRequired,
};

export default SelectionsStep;
