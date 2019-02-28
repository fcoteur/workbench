import React from 'react'
import styled from 'styled-components';

import Gameoflife from './Gameoflife';
import Markdown from './Markdown';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Earlyapps() {
  return (
    <Container>
      <Gameoflife />
      <Markdown />
    </Container>
  )
}
