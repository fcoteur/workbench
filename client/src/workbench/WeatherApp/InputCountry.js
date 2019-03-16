import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Autosuggest from 'react-autosuggest';

export default class FormCountry extends Component {
  static propTypes = {
    country: PropTypes.string.isRequired,
    newCountry: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      visible: false,
      countries: []
    };
  }

  componentWillMount() {
    axios
     .get(process.env.REACT_APP_SERVER + 'weather/country/')
     .then(res =>{
       this.setState({countries: res.data})
     })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const getSuggestions =  inputLength === 0 ? [] : this.state.countries.filter(country =>
      country.name.toLowerCase().slice(0, inputLength) === inputValue
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
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.newCountry(suggestion.alpha2);
  }
  
  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type a country...',
      value,
      onChange: this.onChange
    };
    
    return (  
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion.name}
          renderSuggestion={suggestion => <div>{suggestion.name}</div>}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        /> 
    )

  }
}
