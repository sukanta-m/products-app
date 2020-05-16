import React, { useState } from "react";
import { Modal, Collapse, Button, Table } from "antd";
import styled from "styled-components";
import moment from "moment";
import { ProfileOutlined, MailOutlined } from "@ant-design/icons";
import { ORDER_ITEM_STATUS } from "../../modules/locale";

const { Panel } = Collapse;

const ITEM_STATUS_BG_COLOR = {
  "Added": "#c1e4c1",
  "Not Available": "red",
  "Substituted": "yellow"
};

const OrderDetailsModal = ({
  onOrderBillOrShip,
  order = {},
  onclose
}) => {
  const [items, setItems] = useState(order.items);
  const { name, email, phone, pick_up_time, order_date } = order;

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

  const handleOrderBillOrShip = type => {

  };

  const footer = [
    <StyledButton type="primary" onClick={() => handleOrderBillOrShip("bill")}>
      <ProfileOutlined />
      <span>Ready for Billing</span>
    </StyledButton>,
    <StyledButton type="primary" onClick={() => onOrderBillOrShip("ship")}>
      <MailOutlined />
      <span>Ready for Shipping</span>
    </StyledButton>,
  ];

  const itemColumns = [
    {
      title: 'Item',
      dataIndex: 'item_name',
      key: 'item_name'
    },
    {
      title: 'State  ',
      dataIndex: 'order_state',
      key: 'order_state',
      render: (status, item) => <div style={{background: ITEM_STATUS_BG_COLOR[item.item_state || status], padding: "16px 16px"}}>{item.item_state || status}</div>,
      className: "status"
    },
  ];

  return (
    <StyledModal
      footer={footer}
      visible
      width={"80%"}
      title={`Order Details`}
      onCancel={() => onclose("")}
    >
      <StyledOrderDetails>
        <Collapse accordion bordered={false}>
          <Panel
            header={`Order Details For ${name} Placed on ${moment(parseInt(order_date)).format("MMM DD YYYY HH:MM A")}`}
            showArrow={false}
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
            scroll={{handleOrderBillOrShip: true, y: "500px"}}
            bordered
            pagination={false}
          />
        </div>
      </StyledOrderDetails>
    </StyledModal>
  )
};

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: flex;
    justify-content: flex-end;
    button + button {
      background: #275271;
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

export default OrderDetailsModal;