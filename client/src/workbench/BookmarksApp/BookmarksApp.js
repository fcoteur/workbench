import React, { Component } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'

import BookmarksList from './BookmarksList'

const Box = styled.div`
  margin: 5px 5px;
  padding: 5px 5px;
  width: 200px;
  text-align: left;
  border: 1pt solid black;
`;

export default class BookmarksApp extends Component {

  static propTypes = {
    status: PropTypes.object.isRequired
  }

  render() {
    return (
      <Box>
        <span><strong>Bookmarks</strong></span><br /> 
        <BookmarksList status={this.props.status} />
      </Box>
    )
  }
}
