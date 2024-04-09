import React, { useEffect, useState } from 'react';
import Select from './Select';
import { apiGetPublicDistrict, apiGetPublicProvince, apiGetPublicWard } from '../services/app';
import InputReadOnly from './InputReadOnly';

const Address = () => {

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [reset, setReset] = useState(false)

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvince()
            if (response?.status === 200) {
                setProvinces(response?.data)
            }
        }
        fetchPublicProvince()
    }, [])
    useEffect(() => {
        setDistrict(null)
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response?.status === 200) {
                setDistricts(response?.data)
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])
    useEffect(() => {
        setWard(null)
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(district)
            if (response?.status === 200) {
                setWards(response?.data)
            }
        }
        district && fetchPublicWard()
        !district ? setReset(true) : setReset(false)
        !district && setWards([])
    }, [district])
    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố' />
                    <Select reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện' />
                    <Select reset={reset} type='ward' value={ward} setValue={setWard} options={wards} label='Phường/Xã' />
                </div>
                <InputReadOnly
                    label={'Địa chỉ đã chọn'}
                    value={`${ward ? `${wards?.find(item => item.wards_id === +ward)?.name},` : ''} ${district ? `${districts?.find(item => item.district_id === +district)?.name},` : ""} ${province ? `${provinces?.find(item => item.province_id === +province)?.name}` : ''}`}
                />
            </div>
        </div>
    )
}

export default Address