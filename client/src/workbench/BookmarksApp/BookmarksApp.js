import React, { Component } from 'react'
import styled from 'styled-components';
import BookmarksList from './BookmarksList'

const Box = styled.div`
  margin: 5px 5px;
  padding: 5px 5px;
  width: 400px;
  text-align: left;
  border: 1pt solid black;
`;

export default class BookmarksApp extends Component {
  render() {
    return (
      <Box>
        <span><strong>Bookmarks</strong></span>
        <BookmarksList />
      </Box>
    )
  }
}
