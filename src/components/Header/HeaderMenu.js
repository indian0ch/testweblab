import { useState } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function HeaderMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar {...props}>
      <NavbarBrand href="/">Film app</NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem className="d-flex align-items-center mx-2">
            <Link className={classes.link} to="/catalog">
              Каталог
            </Link>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <Link className={classes.link} to="/search">
              Пошук
            </Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className={classes.link} nav caret>
              Сервіси
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                {" "}
                <NavItem>
                  <Link className={classes.link} to="/editing/add">
                    Додати фільм
                  </Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem>
                {" "}
                <NavItem>
                  <Link className={classes.link} to="/editing/delete">
                    Видалити фільм
                  </Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                {" "}
                <NavItem>
                  <Link className={classes.link} to="/import">
                    Імпорт
                  </Link>
                </NavItem>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
export default HeaderMenu;
