import React from "react";
import { Table } from "antd";
import moment from "moment";
import styled from "styled-components";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ORDER_STATUS_ENUM, ORDER_STATUS } from "../../modules/locale";

const ItemLists = ({
  data,
  handleOrderProcess
}) => {
  const columns = [
    {
      title: 'Process',
      dataIndex: 'order_id',
      key: 'order_id',
      render: (orderId, record) => {
        const disabled = [ORDER_STATUS.COMPLETED, ORDER_STATUS.CANCELLED].includes(ORDER_STATUS_ENUM[record.order_status]);
        return (
          <StyledCartButton type="primary" disabled={disabled} onClick={() => handleOrderProcess(orderId)}>
            <ShoppingCartOutlined/>
            <span>Process Order</span>
          </StyledCartButton>
        )
      },
      width: 150
    },
    {
      title: 'Date',
      dataIndex: 'order_date',
      key: 'order_date',
      render: (date) => {
        return (
          <div style={{display: "flex", flexDirection: "column"}}>
            <span>{moment(parseInt(date) * 1000).format("ddd MMM DD YYYY")}</span>
            <span>{moment(parseInt(date) * 1000).format("hh:mm A")}</span>
          </div>
        )
      },
      sorter: (a, b) => a.order_date - b.order_date,
      sortDirections: ['descend', "ascend"],
      defaultSortOrder: "descend",
      width: 200
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 600,
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend', "ascend"]
    },
    {
      title: 'Status',
      dataIndex: 'order_status',
      key: 'order_status',
      render: status => ORDER_STATUS_ENUM[status] || status
    },
    {
      title: '#Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items.length,
      sorter: (a, b) => a.items.length - b.items.length,
      sortDirections: ['descend', "ascend"],
      responsive: window.isMobile? ["md"] : ""
    },
  ];
  return (
    <StyledWrapper isMobile={window.isMobile}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          defaultPageSize: 5
        }}
        bordered
        rowKey="order_id"
      />
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  border: 1px solid #f0f0f0;
  margin-top: 20px;
  table {
    td {
      padding: ${({isMobile}) => isMobile ? "16px 8px" : "16px 8px"};
    }
  }
  button {
    width: ${({isMobile}) => isMobile ? "100px" : "100%"};
    font-size: ${({isMobile}) => isMobile ? "12px" : "14px"};
  }
  .ant-pagination-options {
    display: inline-block;
  }
`;

const StyledCartButton = styled(Button)`
  display: flex;
  align-items: center;
  height: auto;
  flex-direction: column;
`;

export default ItemLists;