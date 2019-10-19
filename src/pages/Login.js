import React from "react";
import { Typography } from "antd";
import { Form, Icon, Input, Button } from "antd";
import "./Login.css";
import { useAuth } from "../context/auth-context";

const { Title } = Typography;

const Login = function({ form }) {
  const { login } = useAuth();
  const { getFieldDecorator } = form;

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, { email, password }) => {
      if (!err) {
        login({
          email,
          password
        });
      }
    });
  }

  return (
    <div className="page">
      <div className="container">
        <Title>Iniciar sesión</Title>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Introduce un correo",
                  type: "email"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Introduce una contraseña", min: 6 }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const WrappedLoginForm = Form.create({ name: "login" })(Login);
export default WrappedLoginForm;
