// import { Button, Form, Input, Typography } from 'antd';
// import { useAppDispatch } from 'app/hooks';
// import imageLogin from 'assets/image/login_background.png';
// import routesMap from 'layouts/routesMap';
// import { trim } from 'lodash';
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { actionAuthLogin } from 'redux/auth/actions';
// import { notificationError } from 'utils/notifications';
// import { getDataStorage, STORAGE_KEY } from 'utils/storage';

// const { Title } = Typography;

// interface FormLogin {
//   email: string;
//   password: string;
// }

// const LoginPage: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [form] = Form.useForm<FormLogin>();

//   useEffect(() => {
//     if (trim(getDataStorage(STORAGE_KEY.ACCESS_TOKEN))) {
//       navigate(routesMap.HOME);
//     }
//   }, [navigate]);

//   const handleSubmit = async () => {
//     try {
//       const data = await form.validateFields();
//       handleLogin(data);
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   const handleLogin = async (data: FormLogin) => {
//     try {
//       await dispatch(actionAuthLogin(data)).unwrap();
//       navigate(routesMap.HOME);
//     } catch (error) {
//       notificationError('Username or password incorrect!');
//     }
//   };

//   const handleClickForgetPassword = async () => {
//     navigate(routesMap.FORGOTTEN_PASSWORD);
//   };

//   // const getGoogleLoginLink = async (): Promise<void> => {
//   //   try {
//   //     const response = await api.get<BaseResponse<{ link: string; redirectUri: string }>>(url.getGoogleLoginLink, {
//   //       params: {
//   //         redirectUri: `${window.location.origin}/google-login`,
//   //       },
//   //     });
//   //     window.open(response.data?.data?.link);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   return (
//     <div
//       className="h-[100vh] flex flex-col justify-center"
//       style={{
//         backgroundImage: `url(${imageLogin})`,
//       }}
//     >
//       <div className="flex justify-end mr-36 ">
//         <div className="bg-white flex flex-col py-8 px-20 rounded-xl shadow-xl max-w-[528px]">
//           <Title className="text-center text-[40px] leading-[48px] font-bold mb-8">Login</Title>
//           {/* <div className="flex justify-center">
//             <Button className="h-12 w-12 !p-2" shape="round" onClick={getGoogleLoginLink}>
//               <GoogleLogo className="w-full h-full block" />
//             </Button>
//           </div> */}
//           <Form form={form} className="min-w-[250px]">
//             <Form.Item
//               name={'email'}
//               labelAlign="left"
//               required
//               rules={[{ required: true, message: 'Please input your email!' }]}
//             >
//               <Input placeholder="email address" size="large" />
//             </Form.Item>
//             <Form.Item
//               name={'password'}
//               labelAlign="left"
//               required
//               rules={[{ required: true, message: 'Please input your password!' }]}
//             >
//               <Input.Password placeholder="password" size="large" />
//             </Form.Item>
//           </Form>
//           <div className="flex mx-2 justify-end items-center">
//             <Button type="link" onClick={handleClickForgetPassword}>
//               Forget Password?
//             </Button>
//           </div>
//           <Button block type="primary" className="mt-5" onClick={handleSubmit}>
//             Login
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
