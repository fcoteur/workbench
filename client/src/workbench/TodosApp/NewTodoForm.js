import React, { Component } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'

const Box = styled.div`
  margin: 3px 0px;
`;

export default class NewTodoForm extends Component {

  static propTypes = {
    handleAddToDo: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        visible: false
    } 
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value 
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddToDo(this.state)
    this.setState({title: ''})
  }

  toggleVisible = () =>  {
    this.setState({title: '',visible: !this.state.visible})
  }

  render() {
    return (
      <Box>
        <div style={{display: this.state.visible === true ? "none" : "inline"}}>
          <u onClick={this.toggleVisible}  style={{cursor: "pointer"}}>New</u>
        </div>
        <div style={{display: this.state.visible === false ? "none" : "inline"}} >
          <form onSubmit={this.handleSubmit} style={{display: 'inline'}}>
              <input placeholder='enter todo...' autoComplete="off" value={this.state.title} name='title' onChange={this.handleChange} />
              <input type='submit' value={String.fromCharCode(0x21B5)} />
          </form>
          <button onClick={this.toggleVisible} style={{display: 'inline'}}>{String.fromCharCode(0x2A2F)}</button>
        </div>
      </Box>
    )
  }
}
