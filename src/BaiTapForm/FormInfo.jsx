import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormAction } from '../store/slice';
import { useQueryUrl } from '../hooks/useQueryUrl';


const FormInfo = () => {

    // Tạo ra state để quản lý giá trị trong ô input:
    const [formValue, setFormValue] = useState();

    // Tạo state formError để quản lý Error:
    const [formError, setFormError] = useState()

    const { productEdit } = useSelector(state => state.baiTapForm)

    const dispatch = useDispatch()

    // Hàm rút gọn validate:
    const validate = (element) => {

        const { placeholder, name, value, validity, minLength, maxLength } = element

        const { valueMissing, tooShort, tooLong, patternMismatch } = validity

        let mess;

        if (valueMissing) {
            mess = `${placeholder} không được để trống`
        } else if (patternMismatch) {
            mess = `${placeholder} chưa đúng định dạng`
        } else if (tooShort || value.length < minLength) {
            mess = `${placeholder} phải ít nhất ${minLength}  ký tự`
        } else if (tooLong) {
            mess = `${placeholder} phải tối đa ${maxLength} ký tự`
        }

        return mess
    }

    // Tạo hàm handleFormValue  => currying function:
    const handleFormValue = () => (event) => {

        const { name, value, validity, minLength, maxLength } = event.target

        let mess = validate(event.target)

        // const { valueMissing, tooShort, tooLong, patternMismatch } = validity

        // let mess;

        // if (valueMissing) {
        //     mess = `Vui lòng nhập ${name}`
        // } else if (patternMismatch) {
        //     mess = `${name} phải là số`
        // } else if (tooShort) {
        //     mess = `${name} phải ít nhất ${minLength}  ký tự`
        // } else if (tooLong) {
        //     mess = `${name} phải tối đa ${maxLength} ký tự`
        // }

        setFormError({
            ...formError,
            [name]: mess
        })

        // Nếu không có lỗi => mess không có giá trị => mới tạo Form Value 
        if (!mess) {
            setFormValue({
                ...formValue,
                [name]: value
            })
        }

    }

    React.useEffect(() => {
        // Nếu có productEdit thì set, không thì return
        if (!productEdit) return
        setFormValue(productEdit)
    }, [productEdit])






    return (
        <div>
            <form
                noValidate
                onSubmit={(event) => {
                    // Ngăn sự kiện reload của browser khi submit form
                    event.preventDefault()

                    // Dom input:
                    const element = document.querySelectorAll('input')

                    let error = {}

                    element.forEach((ele) => {
                        const { name, value, validity, minLength, maxLength } = ele

                        // const { valueMissing, tooShort, tooLong, patternMismatch } = validity

                        // let mess;

                        // if (valueMissing) {
                        //     mess = `Vui lòng nhập ${name}`
                        // } else if (patternMismatch) {
                        //     mess = `${name} phải là số`
                        // } else if (tooShort) {
                        //     mess = `${name} phải ít nhất ${minLength}  ký tự`
                        // } else if (tooLong) {
                        //     mess = `${name} phải tối đa ${maxLength} ký tự`
                        // }

                        let mess = validate(ele)

                        error[name] = mess;
                    })

                    setFormError(error)
                    

                    // Nếu có validation, ngăn việc submit:
                    let isFlag = false;
                    for (let key in error) {
                        if (error[key]) {
                            isFlag = true
                            break
                        }
                    }
                    if (isFlag) return

                    if (!productEdit) {
                        dispatch(baiTapFormAction.addProduct(formValue))
                    } else {
                        dispatch(baiTapFormAction.updateProduct(formValue))
                    }


                }}>

                {/* Button ở trong Form sẽ có type mặc định là submit */}
                {/* Khi nhấn vào btn button có type = submit => tự động thực hiện code trong hàm onSubmit */}

                <h2 className='p-2 bg-dark text-white text-start fs-4 mt-3'>Thông tin sinh viên</h2>

                <div className="row mt-3 text-start">
                    <div className="col-6">
                        <p className='mb-1'>Mã SV</p>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Mã SV'
                            // Kiểm tra formValue có thuộc tính id không, có thì lấy, k thì thôi
                            value={formValue?.maSV || ''}
                            // value={productEdit?.id}
                            name='maSV'

                            // KHi edit, k thể chỉnh sửa id
                            disabled={!!productEdit}

                            // Validate:

                            required
                            // minLength={4}
                            maxLength={4}
                            pattern='^[0-9]+$'

                            // onChange={(event) => {
                            //     setFormValue({
                            //         ...formValue,
                            //         id: event.target.value
                            //     })
                            // }}

                            onChange={handleFormValue()}
                        />

                        {formError?.maSV && <p className='text-danger'>{formError?.maSV}</p>}

                    </div>
                    <div className="col-6">
                        <p className='mb-1'>Họ tên</p>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Họ tên'
                            value={formValue?.hoTen || ''}
                            name='hoTen'
                            // Kiểm tra formValue có thuộc tính id không, có thì lấy, k thì thôi

                            required
                            pattern='^[a-zA-Z _ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'

                            onChange={handleFormValue()}
                        />
                        {formError?.hoTen && <p className='text-danger'>{formError?.hoTen}</p>}

                    </div>
                    <div className="col-6 mt-3">
                        <p className='mb-1'>Số điện thoại</p>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Số điện thoại'
                            // Kiểm tra formValue có thuộc tính id không, có thì lấy, k thì thôi
                            value={formValue?.soDienThoai || ''}
                            name='soDienThoai'

                            required
                            maxLength={10}
                            pattern='^[0-9]+$'

                            onChange={handleFormValue()}
                        />
                        {formError?.soDienThoai && <p className='text-danger'>{formError?.soDienThoai}</p>}

                    </div>
                    <div className="col-6 mt-3">
                        <p className='mb-1'>Email</p>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Email'
                            value={formValue?.email || ''}

                            required
                            pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

                            name='email'
                            // Kiểm tra formValue có thuộc tính id không, có thì lấy, k thì thôi
                            onChange={handleFormValue()}
                        />

                        {formError?.email && <p className='text-danger'>{formError?.email}</p>}

                    </div>

                </div>

                <div className='mt-3 text-start'>
                    {
                        productEdit ? (
                            <button
                                className='btn btn-info'
                                data-bs-toggle='modal'
                                data-bs-target='#updateSuccess'
                            >Cập nhật sinh viên</button>
                        ) : (
                            <button
                                className='btn btn-success'
                                data-bs-toggle='modal'
                                data-bs-target='#addSuccess'
                            >Thêm sinh viên</button>
                        )
                    }
                </div>



            </form>
        </div>
    )
}

export default FormInfo