import React from 'react';
import styled from 'styled-components';
import './App.css';
import Notes from './components/Notes';
import Write from './components/Write';

function App() {
  return (
    <Container>
      <Write />
      <Notes />
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 60px 30px;
`;
