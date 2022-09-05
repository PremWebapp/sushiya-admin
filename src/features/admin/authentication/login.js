import React, { useState, useEffect } from 'react';
// import openSocket from 'socket.io-client';
import './login.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authFun } from '../../../redux/reducers/authReducer';
import { useSelector } from "react-redux";
import "./login.css";

// // const socket = openSocket('http://localhost:4000/');

import { Form, Input, Checkbox, Row, Col, message } from "antd";
import styles from "./login.module.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SushiyaLogo from "../../../img/sushiya_logo.png";

export const Login = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch()
  const currentLocation = useLocation().pathname

  const onFinish = (Formvalues) => {
    dispatch(authFun(Formvalues))
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { userData: { token, user } } = useSelector(state => state.auth)

  // this function will be triggered when founded token  and admin type
  useEffect(() => {
      if (token && user.type === "admin") navigate(currentLocation);
      // eslint-disable-next-line
  }, [])

  // this function will be triggered when founded token changes
  useEffect(() => {
      if (token && user.type === "admin") navigate("/Admin");
  }, [token])

  // socket.on('connect', function (con) {
  //     console.log(con)
  // })


  // For Staff Type Form Data 
  let [login, setLogin] = useState({
      mobile: '',
      password: '',

  });

  // For Staff Type Form Data Filling
  const loginChange = e => {
      let { name, value } = e.target;
      if (name === 'mobile') setLogin({ ...login, [name]: value.replace(/\D/g, "") })
      else setLogin({ ...login, [name]: value });
  };
  return (
    <div className={styles.LoginContainer}>
      <Row justify="space-around" align="middle">
        <Col lg={12}>
          <img
            className={styles.Loginimage}
            src="https://images.pexels.com/photos/2871757/pexels-photo-2871757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="image"
          />

          <div className={styles.logoBackground}>
            <img width={150} src={SushiyaLogo} alt="" />
          </div>
        </Col>

        <Col lg={12}>
          <div className={styles.MainLoginForm}>
            <div className="text-center ">
              <h1>Sushiya</h1>
              <hr />
            </div>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 15 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              // autoComplete="off"
            >
              <Form.Item label="Mobile Number" name="mobile"
               rules={[
                  {
                    pattern: /^[\d]{10,10}$/,
                    message: "mobile number should be 10 character",
                  },
                { required: true, message: "Please input your mobile number!" },
              ]}>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="mobile"
                  type='number'
                />
              </Form.Item>

              <Form.Item
                label="password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>

              {/* <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 6, span: 16 }}
              >
                {/* <Checkbox
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  Remember me
                </Checkbox> 
             </Form.Item> */}

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <button className="button_default" htmlType="submit">
                  Sign In
                </button>
              </Form.Item>
              {/* <span>Not a member?<Link to="/restaurantDetails" >register now!</Link></span>  */}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

