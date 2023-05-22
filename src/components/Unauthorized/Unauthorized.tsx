import React from "react";
import styled from "styled-components";
import { seqBlue100, seqLightBlue } from "../../globals/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${seqBlue100};
  height: 100vh;
  overflow: hidden;
  background-color: ${seqLightBlue};
`;
const Header = styled.span`
  font-size: 40px;
  margin-bottom: 50px;
  font-weight: 700;
`;
const SubHeader = styled.span`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Unauthorized = () => {
  return (
    <Container>
      <Header>Unauthorized User</Header>
      <SubHeader>You're not allowed to access this page</SubHeader>
    </Container>
  );
};

export default Unauthorized;
