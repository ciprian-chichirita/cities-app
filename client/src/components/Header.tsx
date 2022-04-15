import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { HeaderProps } from '../models';

export const Header = (props: HeaderProps) => {
  const { onSelect, filterByContinentOptions = [] } = props;

  const renderDropDownOptions = (filterByContinentOptionsArr: Array<string>) => {
    const dropDownOptions = filterByContinentOptionsArr.map((continent, pos) => {
      return (<NavDropdown.Item key={`${continent.replace(/\s/g, '-')}_${pos}`} eventKey={continent}>{continent}</NavDropdown.Item>);
    });
    dropDownOptions.unshift(<NavDropdown.Item key={`all`} eventKey={'all'}>{'all'}</NavDropdown.Item>);
    return dropDownOptions;
  }

  return (
    <header>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand>Cities</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            className='justify-content-end'
            id='basic-navbar-nav'
          >
            <Nav>
              <NavDropdown
                title='Filter by Continent'
                id='basic-nav-dropdown'
                onSelect={onSelect}
              >
                {renderDropDownOptions(filterByContinentOptions)}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
