import React, { Component } from 'react'
import styled from 'styled-components';
import uuid from 'uuid'
import axios from 'axios'

import Bookmark from './Bookmark'
import NewBookmarkForm from './NewBookmarkForm';

const Box = styled.div`
  text-align: left;
`;

export default class BookmarkList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_SERVER + 'bookmarks')
      .then(res =>{
        const newState = {...this.state, data: res.data}
        this.setState(newState)
      })
  }

  handeDelete(e) {
    const { data } = this.state;
    this.setState({data: data.slice(0, e).concat(data.slice(e+1))},() => {
      axios
        .post(process.env.REACT_APP_SERVER + 'bookmarks/delete/', {
          id: data[e]._id
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  handleAdd(data) {
    let newData = this.state.data.slice()
    newData.push({
      _id: uuid.v4(),
      title: data.title,
      url: data.url,
    })
    this.setState({data: newData},() => {
      axios
        .post(process.env.REACT_APP_SERVER + 'bookmarks/create/', {
          title: data.title,
          url: data.url,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  handleEdit(data) {
    let newData = this.state.data.slice()
    const index = this.state.data.findIndex(x => x._id === data._id);
    newData[index].title = data.title;
    newData[index].url = data.url;
    this.setState({data: newData}, () => {
      axios
        .post(process.env.REACT_APP_SERVER + 'bookmarks/update/', {
          id: newData[index]._id,
          title: data.title,
          url: data.url,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  render() {
    const list = this.state.data.map((record, idx) => {
      return (
        <Bookmark
          key={record._id}  
          bookmark={record} 
          delete={this.handeDelete.bind(this, idx)} 
          edit={this.handleEdit.bind(this)}
        />
      )
    });

    return (
      <Box>
        <NewBookmarkForm handleAdd={this.handleAdd}/>
        {list}
      </Box>
    );
  }
}