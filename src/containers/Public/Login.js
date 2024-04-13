import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import validate from "../../ultils/Common/validateField";

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag);
    const [invalidFields, setInvalidFields] = useState([]);
    const [payload, setpayload] = useState({
        phone: '',
        password: '',
        name: ''
    });

    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])
    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])
    useEffect(() => {
        msg && Swal.fire('Lỗi !', msg, 'error')
    }, [msg, update])
    const handleSubmit = async () => {
        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload, setInvalidFields)
        if (invalids === 0) {
            isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
        }
    }

    return (
        <div className="w-full flex items-center justify-center">
            <div className="bg-white w-[500px] p-[30px] pb-[100px] rounded=md shadow-sm">
                <h3 className="font-semibold text-2xl mb-3">{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</h3>
                <div className="w-full flex flex-col gap-6">
                    {isRegister && <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        label={"Họ tên"}
                        value={payload.name}
                        setValue={setpayload}
                        keyPayload={'name'}
                    />}
                    <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        label={"Số điện thoại"}
                        value={payload.phone}
                        setValue={setpayload}
                        keyPayload={'phone'}
                    />
                    <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        label={"Mật khẩu"}
                        value={payload.password}
                        setValue={setpayload}
                        keyPayload={'password'}
                        type='password'
                    />
                    <Button
                        text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
                        bgColor='bg-secondary1'
                        textColor='text-white'
                        fullwidth
                        onClick={handleSubmit}
                    />
                </div>
                <div className="mt-7 flex items-center justify-between">
                    {isRegister ? <small>Bạn đã có tài khoản? <span
                        onClick={() => {
                            setIsRegister(false)
                            setpayload({
                                phone: '',
                                password: '',
                                name: ''
                            })
                        }}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >Đăng nhập ngay</span></small>
                        :
                        <>
                            <small className="text-[black] hover:text-[orange] cursor-pointer">Quên mật khẩu</small>
                            <small onClick={() => {
                                setIsRegister(true)
                                setpayload({
                                    phone: '',
                                    password: '',
                                    name: ''
                                })
                            }} className="text-[black] hover:text-[orange] cursor-pointer">Tạo tài khoản mới</small>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
export default Login