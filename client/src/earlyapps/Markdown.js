import React from 'react';
import marked from 'marked';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-items: center;
  width: 50%;
  background: silver;
`;
const FlexItem = styled.div`
  
  padding: 5px;
`;

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: "The use case\n============\nWrite down you text in **Markdown** style on the left and it wil be automatically formatted on the right hand side.\n\n## Examples\n\n1. *emphasis*\n2. **strong**\n3. [a link](http://example.com/)\n\n> block notes level 1\n>> block notes level 2\n\nmore on [daringfireball.net](https://daringfireball.net/projects/markdown/)\n\n>*Made by Francis Coteur*\n"
    };
    this.changeText = this.changeText.bind(this);
  } 
  render() {
    // marked is returning a string, so it needs to be set to HTML by dangerouslySetInnerHTML
    let output= { __html: marked(this.state.text, {sanitize: true})};
    return (
      <Container>
        <FlexItem>
          <textarea rows="40" cols='40' onChange={this.changeText}>{this.state.text}</textarea>
        </FlexItem>
        <FlexItem>
          <div  dangerouslySetInnerHTML={output} />
        </FlexItem>
      </Container>
    );
  }
  changeText(e) {
    this.setState({text: e.target.value})
  }
}
