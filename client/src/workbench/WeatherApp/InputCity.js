import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Autosuggest from 'react-autosuggest';

export default class FormCity extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired,
    country:  PropTypes.string.isRequired,
    newCity: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      cities: []
    };
  }

  componentWillMount = () => {
    axios
      .get(process.env.REACT_APP_SERVER + 'weather/city/' + this.props.country)
      .then(res =>{
        this.setState({cities: res.data})
      })
  }

  componentWillReceiveProps(nextProps){
    if(JSON.stringify(this.props.country) !== JSON.stringify(nextProps.country)) {
      axios
     .get(process.env.REACT_APP_SERVER + 'weather/city/'+nextProps.country)
     .then(res =>{
       this.setState({cities: res.data})
     })
    }
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
  };
  
  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.newCity(suggestion.name + ',' + suggestion.country);
  }
  
  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type a city...',
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
