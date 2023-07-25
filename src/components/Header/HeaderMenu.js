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
import { useDispatch } from "react-redux";
import { tokenLoaderActions } from "../../storage/tokenSlice";

function HeaderMenu(props) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function unLoginHandler(){
    dispatch(tokenLoaderActions.setLogin(false));
  }

  return (
    <Navbar {...props}>
      <NavbarBrand>Film app</NavbarBrand>
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
          <NavItem className={classes.navItem}>
            <NavLink
              className='text-decoration-underline'
              onClick={unLoginHandler}
            >
              Розлогінитись
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
export default HeaderMenu;
