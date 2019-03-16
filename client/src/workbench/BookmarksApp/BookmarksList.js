import React, { Component } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import uuid from 'uuid'
import axios from 'axios'

import Bookmark from './Bookmark'
import NewBookmarkForm from './NewBookmarkForm';

const Box = styled.div`
  text-align: left;
`;

export default class BookmarkList extends Component {
  static propTypes = {
    status: PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    const AuthStr = 'bearer ' + this.props.status.token
    axios
      .get(process.env.REACT_APP_SERVER + 'bookmarks/'  + this.props.status.userId, { headers: { Authorization: AuthStr }})
      .then(res =>{
        const newState = {...this.state, data: res.data}
        this.setState(newState)
      })
  }

  handeDelete(e) {
    const { data } = this.state;
    const AuthStr = 'bearer ' + this.props.status.token
    this.setState({data: data.slice(0, e).concat(data.slice(e+1))},() => {
      axios
        .post(process.env.REACT_APP_SERVER + 'bookmarks/delete/', {
          id: data[e]._id
        }, {headers: { Authorization: AuthStr }})
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
      createdBy: this.props.status.userId
    })
    this.setState({data: newData},() => {
      const AuthStr = 'bearer ' + this.props.status.token
      axios
        .post(process.env.REACT_APP_SERVER + 'bookmarks/create/', {
          title: data.title,
          url: data.url,
          createdBy: this.props.status.userId
        }, {headers: { Authorization: AuthStr }})
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
      const AuthStr = 'bearer ' + this.props.status.token
      axios
        .post(process.env.REACT_APP_SERVER + 'bookmarks/update/', {
          id: newData[index]._id,
          title: data.title,
          url: data.url
        }, {headers: { Authorization: AuthStr }})
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
        {list}
        <NewBookmarkForm handleAdd={this.handleAdd}/>
      </Box>
    );
  }
}