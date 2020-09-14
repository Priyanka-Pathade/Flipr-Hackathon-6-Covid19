import React, { useState } from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom'

const Navbar = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="mynav">
      <Nav tabs>
      <NavItem>
          <h3 style={{marginRight: "50px",marginLeft: "20px"}} id="covid">Covid-19 </h3>
        </NavItem>
        <NavItem>
          <NavLink exact active style={{color: "blue"}}><Link to="/graph"><b>Deceased Persons</b></Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link to="/first"><b>Contact & helpline</b></Link></NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret>
            <b>Hospital Dashboards</b>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><Link to="/thirdA"><b>Hospitals & Beds</b></Link></DropdownItem>
            <DropdownItem ><Link to="/thirdB"><b>Medical colleges & Beds</b></Link></DropdownItem>
            <DropdownItem ><Link to="/summaryCard"><b>Total Summary</b></Link></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        <NavItem>
          <NavLink><Link to="/second"><b>Notifications & advisories</b></Link></NavLink>
        </NavItem>
        
      </Nav>
    </div>
  );
}

export default Navbar;
