
const validate = (payload, setInvalidFields) => {
    let invalids = 0
    let fields = Object.entries(payload)
    fields.forEach(item => {
        if (item[1] === "") {
            setInvalidFields(prev => [...prev, {
                name: item[0],
                message: 'Bạn không được bỏ trống trường này'
            }])
            invalids++
        }
    })
    fields.forEach(item => {
        switch (item[0]) {
            case 'password':
                if (item[1].length < 6) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Mật khẩu phải tối thiểu 6 ký tự'
                    }])
                    invalids++
                }
                break;
            case 'phone':
                if (!+item[1]) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Số điện không hợp lệ'
                    }])
                    invalids++
                }
                break;
            case 'priceNumber':
            case 'areaNumber':
                if (+item[1] == 0) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Bạn chưa nhập giá trị cho trường này'
                    }])
                    invalids++
                }
                if (!+item[1]) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Hãy nhập số cho trường này'
                    }])
                    invalids++
                }
                break;

            default:
                break;
        }
    })
    return invalids
}

export default validate