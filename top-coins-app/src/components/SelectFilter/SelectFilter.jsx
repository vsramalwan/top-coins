import React from 'react';
import PropTypes from 'prop-types';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SelectFilter extends React.Component {
  state = {
    coins: 10,
    name: 'hai',
  };

  handleChange = event => {
    this.setState({ coins: event.target.value });
  };

  render() {
    const { limit } = this.props;
    return (
      <form>
        <FormControl variant="outlined">
          <InputLabel>Coins</InputLabel>
          <Select
            value={this.state.coins}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={40}
                name="coins"
                id="outlined-coins-simple"
              />
            }
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectFilter.propTypes = {
  limit: PropTypes.number.isRequired,
};

export default SelectFilter;