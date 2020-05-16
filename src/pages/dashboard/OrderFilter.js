import React from "react"
import styled from "styled-components";
import { Button } from "antd";
import Search from "../sharedComponents/Search";
import { ORDER_STATUS } from "../../modules/locale";

const OrderFilter = ({
  order = [],
  handleSearch,
  onClickSearchBtn,
  searchBtnValue
}) => {
  const counters = order.reduce((acc, o) => {
    if (acc[o.order_status]) {
      acc[o.order_status] = acc[o.order_status] + 1;
    } else {
      acc[o.order_status] = 1;
    }
    return acc;
  }, {});

  const activeBtnStyle = {
    background: "grey",
    color: "white"
  };

  return (
    <StyledWrapper>
      <StyledButtonGroup>
        <StyledButton onClick={() => onClickSearchBtn("0")} style={searchBtnValue === "0" ? activeBtnStyle : {}}>
          <span className="counter">{counters["0"] || 0}</span>
          <span className="status">{ORDER_STATUS.NEW}</span>
        </StyledButton>
        <StyledButton onClick={() => onClickSearchBtn("1")} style={searchBtnValue === "1" ? activeBtnStyle : {}}>
          <span className="counter">{counters["1"] || 0}</span>
          <span className="status">{ORDER_STATUS.IN_PROGRESS}</span>
        </StyledButton>
        <StyledButton onClick={() => onClickSearchBtn("2")} style={searchBtnValue === "2" ? activeBtnStyle : {}}>
          <span className="counter">{counters["2"] || 0}</span>
          <span className="status">{ORDER_STATUS.READY_FOR_BILLING}</span>
        </StyledButton>
        <StyledButton onClick={() => onClickSearchBtn("3")} style={searchBtnValue === "3" ? activeBtnStyle : {}}>
          <span className="counter">{counters["3"] || 0}</span>
          <span className="status">{ORDER_STATUS.READY_FOR_PICKUP}</span>
        </StyledButton>
      </StyledButtonGroup>
      <Search onChange={handleSearch}/>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
input {
  width: 40%;
}
`;

const StyledButtonGroup = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin: 30px 0 20px 0;
`;
const StyledButton = styled(Button)`
display: flex;
flex-direction: column;
height: auto;
align-items: center;
width: 160px;
padding: 10px;
margin: 0 15px;
border-radius: 10px;
.counter {
  font-size: 22px;
  font-weight: bold;
}
.status {
  font-size: 15px;
  font-weight: 500;
}
`;

export default OrderFilter;