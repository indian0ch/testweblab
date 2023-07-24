import { useState } from "react";
import classes from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function HeaderMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  console.log();

  return (
    <Navbar {...props}>
      <NavbarBrand href="/">Film app</NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem className={classes.navItem}>
            <NavLink
              className={classes.link}
              to="/catalog"
              onClick={isOpen && toggle}
            >
              Каталог
            </NavLink>
          </NavItem>
          <NavItem
            className={classes.navItem}
            onClick={() => {
              if (isOpen) {
                toggle();
              }
            }}
          >
            <NavLink className={classes.link} to="/search">
              Пошук
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className={classes.link} nav caret>
              Сервіси
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                {" "}
                <NavItem>
                  <Link
                    className={classes.link}
                    to="/editing/add"
                    onClick={isOpen && toggle}
                  >
                    Додати фільм
                  </Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem>
                {" "}
                <NavItem>
                  <Link
                    className={classes.link}
                    to="/editing/delete"
                    onClick={isOpen && toggle}
                  >
                    Видалити фільм
                  </Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                {" "}
                <NavItem>
                  <Link
                    className={classes.link}
                    to="/import"
                    onClick={isOpen && toggle}
                  >
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
