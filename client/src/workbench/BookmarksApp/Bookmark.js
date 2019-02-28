import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Box = styled.div`
  margin: 1px 0px;
`;

export default class Bookmark extends Component {
  static propTypes = {
    bookmark: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string
    }).isRequired,
    delete: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
        _id: '',
        title: '',
        url: '',
        edit: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState({
      _id: this.props.bookmark._id,
      title: this.props.bookmark.title,
      url: this.props.bookmark.url,
      edit: true
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.edit(this.state)
    this.setState({
      _id: '',
      title: '',
      ulr:'',
      edit: false
    })
  }

  render() {
    return (
      <Box>
        <span style={{cursor: "pointer"}} onClick={this.handleClick}>{String.fromCharCode(0xD83D,0xDD8B)}</span>{' '}
        <span style={{cursor: "pointer"}} onClick={this.props.delete}>{String.fromCharCode(0xD83D,0xDDD1)}</span>{' '}
        
        <div style={{display: this.state.edit === true ? "none" : "inline"}}>
        <a href={this.props.bookmark.url} target="_blank" rel="noopener noreferrer"><span>{this.props.bookmark.title}</span></a>
        </div>
        
        <form style={{display: this.state.edit === false ? "none" : "inline"}} onSubmit={this.handleSubmit}>
          <input 
            id={this.props.bookmark._id}
            value={this.state.title} 
            autoComplete="off" 
            name='title' 
            size="15" 
            onChange={this.handleChange} 
          /> {' '}
          <input 
            id={this.props.bookmark._id}
            value={this.state.url} 
            autoComplete="off" 
            name='url'
            size="20" 
            onChange={this.handleChange} 
          />
          <input type='submit' value={String.fromCharCode(0x21B5)} />
        </form>
      </Box>
    )
  }
}