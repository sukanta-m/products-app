import React from "react";
import { Modal, Collapse, Button, Table } from "antd";
import styled from "styled-components";
import moment from "moment";

const { Panel } = Collapse;

const OrderDetailsModal = ({
  onOrderBillOrShip,
  order = {},
  onclose
}) => {
  const { name, email, items, phone, pick_up_time, order_date } = order;
  const onOrderItemClick = (item, index) => {
    console.log(index)
  }

  const handleOrderBillOrShip = type => {

  };

  const footer = [
    <Button type="primary" onClick={() => handleOrderBillOrShip("bill")}>
      Return
    </Button>,
    <Button type="primary" onClick={() => onOrderBillOrShip("ship")}>
      Submit
    </Button>,
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
      render: (status, item) => item.status || status,
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
  }
}
`;

export default OrderDetailsModal;