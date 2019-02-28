import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Autosuggest from 'react-autosuggest';

export default class WeatherForm extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired,
    newCity: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      visible: false,
      cities: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const getSuggestions =  inputLength === 0 ? [] : this.state.cities.filter(city =>
      city.name.toLowerCase().slice(0, inputLength) === inputValue
    );
    this.setState({
      suggestions: getSuggestions
    });
  };
  
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });

    //populate the suggestions of cities when the first letter is input by the user
    if (newValue.length === 2) {
      axios
      .get(process.env.REACT_APP_SERVER + 'weather/city/' + newValue)
      .then(res =>{
        this.setState({cities: res.data})
      })
    }
  };
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.newCity(this.state.value);
    this.setState({city: this.state.value, visible: false})
  }

  toggleVisible() {
    this.setState({visible: !this.state.visible})
    if (this.state.visible === true) this.setState({value: ''})
  }
  
  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type a city...',
      value,
      onChange: this.onChange
    };
    
    return (
      <div>
        <span>
          
          <div style={{display: this.state.visible === false ? "none" : "inline"}} >
            <form onSubmit={this.handleSubmit} style={{display: 'inline'}}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={suggestion => suggestion.name + ',' + suggestion.country}
              renderSuggestion={suggestion => <div>{suggestion.name},{suggestion.country}</div>}
              inputProps={inputProps}
            /> 
            </form>
          </div>
        </span>
        <span style={{display: this.state.visible === true ? "none" : "inline"}} onClick={this.toggleVisible}>{this.props.city}</span>
      </div>
    )

  }
}
