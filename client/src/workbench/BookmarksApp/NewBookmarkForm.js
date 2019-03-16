import React, { Component } from 'react'
import styled from 'styled-components';

const Box = styled.div`
  margin: 3px 0px;
`;


export default class NewBookmarkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        url:'',
        visible:false
    } 
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value 
    })
  }

  handleSubmit = (e) =>  {
    e.preventDefault();
    this.props.handleAdd(this.state)
    this.setState({title: '', url: '', visible: false})
  }

  toggleVisible = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    return (
      <Box>
        <div style={{display: this.state.visible === true ? "none" : "inline"}}>
          <u onClick={this.toggleVisible} style={{cursor: "pointer"}}>New</u>
        </div>
        <div style={{display: this.state.visible === false ? "none" : "inline"}} >
          <form onSubmit={this.handleSubmit} style={{display: 'inline'}}>
              <input placeholder='enter name...' autoComplete="off" size="18" value={this.state.title} name='title' onChange={this.handleChange} />
              <input placeholder='enter url...' autoComplete="off" size="20" value={this.state.url} name='url' onChange={this.handleChange} />
              <input type='submit' value={String.fromCharCode(0x21B5)} />
          </form>
          <button onClick={this.toggleVisible} style={{display: 'inline'}}>{String.fromCharCode(0x2A2F)}</button>
        </div>
      </Box>
    )
  }
}
