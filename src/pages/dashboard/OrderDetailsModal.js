import React, { useState } from "react";
import { Modal, Collapse, Button, Table, Popover, Spin, Alert } from "antd";
import styled from "styled-components";
import moment from "moment";
import { ProfileOutlined, MailOutlined } from "@ant-design/icons";
import { ORDER_ITEM_STATUS } from "../../modules/locale";
import ReconcileForm from "./ReconcileForm";
const { Panel } = Collapse;

const ITEM_STATUS_BG_COLOR = {
  "Added": "#c1e4c1",
  "Not Available": "red",
  "Substituted": "yellow"
};

const OrderDetailsModal = ({
  onOrderBillOrShip,
  order = {items: []},
  onclose,
  error,
  updatingStatus,
  clearError
}) => {
  const { name, email, phone, pick_up_time, order_date } = order;
  const [items, setItems] = useState(order.items);
  const [showReconcileForm, setShowReconcileForm] = useState();

  const onOrderItemClick = (item, rowIndex) => {
    const currentStatusIndex = ORDER_ITEM_STATUS.indexOf(item.item_state);
    const nextStatusIndex = currentStatusIndex !== -1 ? currentStatusIndex + 1 : 0;
    const modifiedItems = items.map((i, index) => {
      if (index === rowIndex) {
        return {...item, item_state: ORDER_ITEM_STATUS[nextStatusIndex % ORDER_ITEM_STATUS.length]};
      }
      return i;
    });
    setItems(modifiedItems);
  }

  const handleOrderBill = () => {
    const params = {
      order_id: order.order_id,
      items: items.map(({item_name, item_state}) => ({item_name, status: item_state})),
      status_update: "Ready for Billing"
    };
    onOrderBillOrShip(params);
  };

  const handleOrderShip = values => {
    const params = {
      order_id: order.order_id,
      items: items.map(({item_name, item_state}) => ({item_name, status: item_state})),
      status_update: "Ready for Pickup"
    };

    const { receipt_number, bill_amount, notes } = values;
    if (receipt_number) {
      params.receipt_number = `${receipt_number}`;
    }
    if (bill_amount) {
      params.bill_amount = `$${Number.parseFloat(bill_amount).toFixed(2)}`;
    }
    if (values.notes) {
      params.notes = notes;
    }
    onOrderBillOrShip(params);
    hideReconcileForm(false);
  };
  const hideReconcileForm = (value) => setShowReconcileForm(value);

  const footer = <>
    {updatingStatus && <Spin/>}
    {error && <Alert message="Failed to update order status" type="error" showIcon closable onClose={clearError} />}
    <StyledButton type="primary" onClick={handleOrderBill} disabled={updatingStatus}>
      <ProfileOutlined />
      <span>Ready for Billing</span>
    </StyledButton>,
    <StyledPopover
      content={<ReconcileForm onSubmit={handleOrderShip}/>}
      title="Billing Information"
      trigger="click"
      visible={showReconcileForm}
      onVisibleChange={hideReconcileForm}
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
    >
      <StyledButton type="primary" onClick={setShowReconcileForm}  disabled={updatingStatus}>
        <MailOutlined />
        <span>Ready for Pickup</span>
      </StyledButton>
    </StyledPopover></>
  ;

  const itemColumns = [
    {
      title: 'Item',
      dataIndex: 'item_name',
      key: 'item_name',
      className: "item_name"
    },
    {
      title: 'State  ',
      dataIndex: 'item_state',
      key: 'item_state',
      render: (status, item) => <div style={{background: ITEM_STATUS_BG_COLOR[item.item_state || status], padding: "16px 16px"}}>{item.item_state || status}</div>,
      className: "status",
      width: window.isMobile ? "40%" : "20%"
    },
  ];

  return (
    <StyledModal
      footer={footer}
      visible
      width={window.isMobile ? "100%" : "80%"}
      title={`Order Details`}
      onCancel={() => onclose("")}
      isMobile={window.isMobile}
    >
      <StyledOrderDetails>
        <Collapse accordion bordered={false}>
          <Panel
            header={`Order Details For ${name} Placed on ${moment(parseInt(order_date * 1000)).format("MMM DD YYYY hh:mm A")}`}
            showArrow
          >
            <div className="row">
              <span className="title">Name: </span>
              <span>{name}</span>
            </div>
            <div className="row">
              <span className="title">Email: </span>
              <span>{email}</span>
            </div>
            <div className="row">
              <span className="title">Phone: </span>
              <span>{phone}</span>
            </div>
            <div className="row">
              <span className="title">Pick up time: </span>
              <span>{moment(parseInt(pick_up_time)).format("MMM DD YYYY HH:MM A")}</span>
            </div>
          </Panel>
        </Collapse>
        <div className="row items">
          <span className="title">Items</span>
          <Table
            dataSource={items}
            columns={itemColumns}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => onOrderItemClick(record, rowIndex)
              };
            }}
            scroll={{handleOrderBillOrShip: true, y: "300px"}}
            bordered
            pagination={false}
            rowKey="item_name"
          />
        </div>
      </StyledOrderDetails>
    </StyledModal>
  )
};

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: ${({isMobile}) => isMobile ? "5px" : "24px"};
  }
  .ant-modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button + button {
      background: #275271;
    }
    .ant-popover-inner {
      width: ${({isMobile}) => isMobile ? "250px" : "500px"};
      .ant-popover-title {
        font-size: 20px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;

const StyledOrderDetails = styled.div`
.row {
  padding: 5px 0;
  .title {
    font-weight: bold;
  }
}
.items {
  .title {
    margin-left: 10px;
    display: block;
    margin: 10px;
    font-size: 20px;
  }
  table tbody tr {
    cursor: pointer;
    .status {
      padding: 0;
      font-weight: bold;
      background: grey;
      width: 20%;
    }
  }
}
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  height: auto;
  flex-direction: column;
  padding: 10px;
  font-weight: bold;
`;

const StyledPopover = styled(Popover)`

`;
export default OrderDetailsModal;