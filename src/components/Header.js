import React from "react";
import { Menu, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Menu
      inverted
      size="huge"
      style={{
        borderRadius: 0,
        backgroundColor: "#333"
      }}
    >
      <Container
        style={{
          width: "50%"
        }}
      >
        <Menu.Item as={Link} to="/">
          <Icon name="crosshairs" color="orange" />
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/add">
          Add
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Header;
