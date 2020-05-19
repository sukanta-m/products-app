import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from "styled-components";
import { get } from "lodash";
import { Spin, message} from "antd";

import { fetchOrder, updateOrderStatus, clearError } from "../../modules/actions/dashboard";
import ItemLists from "./ItemLists";
import OrderFilter from "./OrderFilter";
import OrderDetailsModal from "./OrderDetailsModal";

const storeId = "18b38a19-42e0-4ecf-9f6a-3b66d969c387";

const Dashboard = ({
  fetchOrder,
  order,
  fetching,
  error,
  updateOrderStatus,
  updatingStatus,
  updateError,
  clearError,
  user
}) => {
  const [searchTxt, setSearchTxt] = useState();
  const [searchBtnValue, setSearchBtnValue] = useState();
  const [orderId, setOrderId] = useState();
  useEffect(() => {
    if (user) {
      fetchOrder(user["custom:store_id"]);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      message.error("Something went wrong");
    }
  }, [error]);

  const handleOrderStatusUpdate = (params) => {
    updateOrderStatus(params).then(r => {
      if (get(r, "payload.status") === 200) {
        message.success("Successfully updated");
        setOrderId("");
      }
    })
  } 
  const getFilteredData = () => {
    let filteredData = order;

    if (searchTxt && searchTxt.trim()) {
      filteredData = order.filter(o => {
        const { name = "", order_id = "", phone_number = "", email = "" } = o;
        if (name.toLowerCase().includes(searchTxt.toLowerCase()) || 
        order_id.toLowerCase().includes(searchTxt.toLowerCase()) ||
        phone_number.toLowerCase().includes(searchTxt.toLowerCase()) ||
        email.toLowerCase().includes(searchTxt.toLowerCase())) {
          return true;
        }
        return false;
      })
    }

    if (searchBtnValue) {
      filteredData = filteredData.filter(d => d.order_status === searchBtnValue);
    }
    return filteredData;
  }
  
  const orderItem = order.find(o => o.order_id === orderId);

  return (
    <StyledDashboard isMobile={window.isMobile}>
      {fetching && <Spin/>}
      {orderId && (
        <OrderDetailsModal
          order={orderItem}
          onclose={setOrderId}
          onOrderBillOrShip={handleOrderStatusUpdate}
          error={updateError}
          updatingStatus={updatingStatus}
          clearError={clearError}
        />
      )}
      <OrderFilter
        order={order}
        handleSearch={setSearchTxt}
        onClickSearchBtn={setSearchBtnValue}
        searchBtnValue={searchBtnValue}
      />
      <ItemLists
        data={getFilteredData()}
        handleOrderProcess={(value) => setOrderId(value)}
      />
    </StyledDashboard>
  )
}

const StyledDashboard = styled.div`
width: ${({isMobile}) => isMobile ? "100%" : "70%"};
margin: auto;
`;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrder,
  updateOrderStatus,
  clearError
}, dispatch)

const mapStateToProps = state => ({
  order: get(state, "dashBoard.order", []),
  fetching: get(state, "dashBoard.fetching", false),
  error: get(state, "dashBoard.error", false),
  updatingStatus: get(state, "dashBoard.updatingStatus", false),
  updateError: get(state, "dashBoard.updateError", false),
  user: get(state, "auth.user")
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Dashboard)