import React from "react"
import styled from "styled-components";
import { Button } from "antd";
import { orderBy, first, last } from "lodash";
import moment from "moment";
import Search from "../sharedComponents/Search";
import { ORDER_STATUS } from "../../modules/locale";

const OrderFilter = ({
  order = [],
  handleSearch,
  onClickSearchBtn,
  searchBtnValue
}) => {
  const sortedOrders = orderBy(order, ["order_date"], ["desc"]);
  const counters = sortedOrders.reduce((acc, o) => {
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

  const lastOrderByDate = last(sortedOrders);
  const firstOrderByDate = first(sortedOrders);

  return (
    <StyledWrapper isMobile={window.isMobile}>
      {firstOrderByDate && lastOrderByDate && (
        <StyledDateRange>
          <b>From</b> {moment(parseInt(lastOrderByDate.order_date, 10)).format("MMM DD YYYY")} <b>to</b> {moment(parseInt(firstOrderByDate.order_date, 10)).format("MMM DD YYYY")}
        </StyledDateRange>
      )}
      <StyledButtonGroup>
        <StyledButton onClick={() => onClickSearchBtn("0")} style={searchBtnValue === "0" ? activeBtnStyle : {}} isMobile={window.isMobile}>
          <span className="counter">{counters["0"] || 0}</span>
          <span className="status">{ORDER_STATUS.NEW}</span>
        </StyledButton>
        <StyledButton onClick={() => onClickSearchBtn("1")} style={searchBtnValue === "1" ? activeBtnStyle : {}} isMobile={window.isMobile}>
          <span className="counter">{counters["1"] || 0}</span>
          <span className="status">{ORDER_STATUS.IN_PROGRESS}</span>
        </StyledButton>
        <StyledButton onClick={() => onClickSearchBtn("2")} style={searchBtnValue === "2" ? activeBtnStyle : {}} isMobile={window.isMobile}>
          <span className="counter">{counters["2"] || 0}</span>
          <span className="status">{ORDER_STATUS.READY_FOR_BILLING}</span>
        </StyledButton>
        <StyledButton onClick={() => onClickSearchBtn("3")} style={searchBtnValue === "3" ? activeBtnStyle : {}} isMobile={window.isMobile}>
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
  width: ${({isMobile}) => isMobile ? "95%" : "40%"};
  margin: ${({isMobile}) => isMobile ? "auto" : "unset"};
}
`;

const StyledButtonGroup = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin: 20px 0 20px 0;
`;
const StyledButton = styled(Button)`
display: flex;
flex-direction: column;
height: auto;
align-items: center;
width: ${({isMobile}) => isMobile ? "24%" : "160px"};
padding: 10px;
margin: ${({isMobile}) => isMobile ? "0 5px" : "0 15px"};
border-radius: 10px;
.counter {
  font-size: 22px;
  font-weight: bold;
}
.status {
  font-size: ${({isMobile}) => isMobile ? "70%" : "15px"};
  font-weight: 500;
}
`;
const StyledDateRange = styled.div`
width: 100%;
margin-top: 30px;
font-size: 20px;
`;

export default OrderFilter;