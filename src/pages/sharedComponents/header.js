import React from "react";
import { connect } from 'react-redux'
import { get } from "lodash";
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { SignOut } from "aws-amplify-react";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from 'antd';

import logo from "../../assets/images/logo.svg";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <NavLink to="/">Dashboard</NavLink>
    </Menu.Item>
  </Menu>
);
const Header = ({ username }) => {
  const RenderNavMenuForMobile = () => {
    if (window.isMobile) {
      return <Dropdown overlay={menu} trigger={['click']}>
        <MenuOutlined style={{color: "white"}} />
      </Dropdown>
    }
    return null;
  }
  return (
    <StyledHeader isMobile={window.isMobile}>
      <StyledLeftMenu>
        <RenderNavMenuForMobile/>
        <img src={logo} alt="Logo" style={{height: window.isMobile ? "30px" : "55px"}}/>
      </StyledLeftMenu>
      <div className="menu">
        {!window.isMobile && <div className="topnav" id="myTopnav">
          <NavLink to="/">Dashboard</NavLink>
        </div>}
      <StyledRightNav isMobile={window.isMobile}>
        <span>{username}</span>
        <SignOut className="signout-link"/>
      </StyledRightNav>
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
display: flex;
justify-content: space-between;
padding: ${({isMobile}) => isMobile ? "10px 5px" : "10px 50px"};
background-color: #333;
align-items: center;
.menu {
  display: flex;
  align-items: center;
  width: 80%;
  display: flex;
  justify-content: space-between;
}
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.topnav .icon {
  display: none;
}

.ant-dropdown-link {
  color: white;
    margin-left: 50px;
}
@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
`;

const StyledRightNav = styled.div`
display: flex;
align-items: center;
width: 100%;
justify-content: flex-end;
span {
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}
${({isMobile}) => isMobile && `button {
  min-width: 100px;
  padding: 5px;
  span {
    font-size: 12px;
  }
}`}
`;

const StyledLeftMenu = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
.anticon-menu {
  margin-right: 5px;
}
`;
export default connect(state => ({username: get(state, ["auth", "user", "cognito:username"])}), null)(Header);