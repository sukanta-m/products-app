import React from "react";
import { Form, Button, InputNumber, Input } from "antd";
import styled from "styled-components";

const ReconcileForm = ({
  onSubmit
}) => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    }
  };
  return (
    <StyledForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      onFinish={onSubmit}
      validateMessages={validateMessages}
    >
      <Form.Item label="Reciept #" name="receipt_number" rules={[{ type: 'number'}]}>
        <InputNumber/>
      </Form.Item>
      <Form.Item label="Bill Amt $" name="bill_amount" rules={[{ type: 'number'}]}>
        <InputNumber/>
      </Form.Item>
      <Form.Item label="Notes" name="notes">
        <Input.TextArea/>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{textAlign: "center"}}>
        <Button htmlType="submit" type="primary" style={{background: "black", color: "white"}}>OK</Button>
      </Form.Item>
    </StyledForm>
  )
};

const StyledForm = styled(Form)`
.ant-input-number {
  width: 100%;
}
`;

export default ReconcileForm;