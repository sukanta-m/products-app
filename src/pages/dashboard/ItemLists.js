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
      key: 'orderId',
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
      key: 'date',
      render: (date) => moment(parseInt(date)).format("MMM DD YYYY HH:mm A"),
      sorter: (a, b) => a.order_date - b.order_date,
      sortDirections: ['descend', "ascend"],
      defaultSortOrder: "descend"
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 600,
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend', "ascend"],
    },
    {
      title: 'Status',
      dataIndex: 'order_status',
      key: 'status',
      render: status => ORDER_STATUS_ENUM[status]
    },
    {
      title: '#Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items.length,
      sorter: (a, b) => a.items.length - b.items.length,
      sortDirections: ['descend', "ascend"],
    },
  ];
  return (
    <StyledWrapper>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSizeOptions: [10, 20, 30, 40, 50],
          showSizeChanger: true
        }}
        bordered
      />
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  border: 1px solid #f0f0f0;
  margin-top: 20px
`;

const StyledCartButton = styled(Button)`
  display: flex;
  align-items: center;
  height: auto;
  flex-direction: column;
`;

export default ItemLists;