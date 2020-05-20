import React from "react";
import { connect } from 'react-redux'
import { get } from "lodash";
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from 'antd';
import logo from "../../assets/images/logo.svg";
import { APP_NAME } from "../../modules/locale";
import { LogoutOutlined } from "@ant-design/icons";

const menu = (user) => {
  return (
    <Menu>
      <Menu.Item key="0">
        {user && <NavLink to="/">Dashboard</NavLink>}
      </Menu.Item>
    </Menu>
  );
};
const Header = ({ user }) => {
  const handleSignout = () => Auth.signOut();
  const RenderNavMenuForMobile = () => {
    if (window.isMobile) {
      return <Dropdown overlay={menu(user)} trigger={['click']}>
        <MenuOutlined style={{color: "white"}} />
      </Dropdown>
    }
    return null;
  }
  return (
    <StyledHeader isMobile={window.isMobile}>
      <StyledLeftMenu isMobile={window.isMobile}>
        <RenderNavMenuForMobile/>
        <img src={logo} alt="Logo" style={{height: window.isMobile ? "22px" : "55px"}}/>
        <span style={{fontSize: window.isMobile ? "13px" : "18px"}}>{APP_NAME}</span>
      </StyledLeftMenu>
      <div className="menu">
        {!window.isMobile && <div className="topnav" id="myTopnav">
          {user && <NavLink to="/">Dashboard</NavLink>}
        </div>}
        {user && <StyledRightNav isMobile={window.isMobile}>
          <span>{user["cognito:username"]}</span>
          <LogoutOutlined onClick={handleSignout}/>
        </StyledRightNav>}
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
  width: ${({isMobile}) => isMobile ? "auto" : "80%"};
  display: flex;
  justify-content: ${({isMobile}) => isMobile ? "flex-end" : "space-between"};
}
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a.active {
  text-decoration: underline;
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
width: ${({isMobile}) => isMobile ? "40%" : "20%"};
font-size: 18px;
color: white;
img {
  margin-right: 10px;
}
.anticon-menu {
  margin-right: 5px;
}
@media only screen and (max-width: 1100px) {
  width: 40%;
}
`;
export default connect(state => ({user: get(state, ["auth", "user"])}), null)(Header);