import { useState } from "react";
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
          <NavItem>
            <Link to="/catalog">Каталог</Link>
          </NavItem>
          <NavItem>
            <Link to="/sortedList">Відсортований список</Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                {" "}
                <NavItem>
                  <Link to="/editing/add">Додати фільм</Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem>
                {" "}
                <NavItem>
                  <Link to="/editing/delete">Видалити фільм</Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                {" "}
                <NavItem>
                  <Link to="/import">Імпорт</Link>
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
