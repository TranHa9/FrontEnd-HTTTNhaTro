import React, { memo, useEffect, useState } from 'react';
import Select from './Select';
import { apiGetPublicDistrict, apiGetPublicProvince, apiGetPublicWard } from '../services/app';
import InputReadOnly from './InputReadOnly';
import { useSelector } from 'react-redux';

const Address = ({ setPayload, invalidFields, setInvalidFields, type }) => {

    const { dataEdit } = useSelector(state => state.post)

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [reset, setReset] = useState(false)
    const [addressValue, setAddressValue] = useState('');


    useEffect(() => {
        if (dataEdit?.address) {
            let addressArr = dataEdit?.address?.split(',')
            let foundProvince = provinces?.length > 0 && provinces?.find(item => item.name.trim() === addressArr[addressArr.length - 1]?.trim())
            setProvince(foundProvince ? foundProvince.province_id : '')
        }
    }, [provinces, dataEdit])

    useEffect(() => {
        if (dataEdit?.address) {
            let addressArr = dataEdit?.address?.split(',')
            let foundDistrict = districts?.length > 0 && districts?.find(item => item.name.trim() === addressArr[addressArr.length - 2]?.trim())
            setDistrict(foundDistrict ? foundDistrict.district_id : '')
        }
    }, [districts, dataEdit])

    useEffect(() => {
        if (dataEdit?.address) {
            let addressArr = dataEdit?.address?.split(',')
            let foundWard = wards?.length > 0 && wards?.find(item => item.name.trim() === addressArr[addressArr.length - 3]?.trim())
            setWard(foundWard ? foundWard.wards_id : '')
        }
    }, [wards, dataEdit])

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
        setDistrict('')
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
        setWard('')
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

    useEffect(() => {
        setPayload && setPayload(prev => ({
            ...prev,
            address: `${addressValue ? `${addressValue}, ` : ''}${ward ? `${wards?.find(item => item.wards_id === +ward)?.name}, ` : ""}${district ? `${districts?.find(item => item.district_id === +district)?.name},` : ""}${province ? `${provinces?.find(item => item.province_id === +province)?.name}` : ''}`,
            provinceId: province ? `${provinces?.find(item => item.province_id === +province)?.province_id}` : '',
            districtId: district ? `${districts?.find(item => item.district_id === +district)?.district_id}` : '',
            wardId: ward ? `${wards?.find(item => item.wards_id === +ward)?.wards_id}` : ''
        }))

    }, [province, district, ward, addressValue])
    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        type='province' value={province}
                        setValue={setProvince}
                        options={provinces}
                        label='Tỉnh/Thành phố'
                    />
                    <Select
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        reset={reset} type='district'
                        value={district} setValue={setDistrict}
                        options={districts} label='Quận/Huyện'
                    />
                    <Select
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        reset={reset} type='ward' value={ward}
                        setValue={setWard} options={wards}
                        label='Phường/Xã'
                    />
                </div>
                {!type &&
                    <div>
                        <label htmlFor={'address-number'} className="text-sm">Số nhà đường phố</label>
                        <input
                            type={'text'}
                            id={'address-number'}
                            className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                            value={addressValue}
                            onChange={(e) => setAddressValue(e.target.value)}
                        />
                    </div>}
                <InputReadOnly
                    label={'Địa chỉ đã chọn'}
                    value={`${addressValue ? `${addressValue},` : ''} ${ward ? `${wards?.find(item => item.wards_id === +ward)?.name},` : ''} ${district ? `${districts?.find(item => item.district_id === +district)?.name},` : ""} ${province ? `${provinces?.find(item => item.province_id === +province)?.name}` : ''}`}
                />
            </div>
        </div>
    )
}

export default memo(Address)