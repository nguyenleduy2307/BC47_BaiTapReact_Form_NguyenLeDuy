import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormAction } from '../store/slice';
import { useQueryUrl } from '../hooks/useQueryUrl';


const Table = ({handleMaSVDelete}) => {

    const { productList } = useSelector(state => state.baiTapForm)

    const dispatch = useDispatch()

    // Search:

    // Tạo state để lấy giá trị trong ô input:
    const [inputValue, setInputValue] = useState()

    // Hook:
    const [queryParam, setQueryParam] = useQueryUrl()


    const hoTenSearch = productList.filter((item) => (
        item.hoTen.toLowerCase().includes(queryParam.hoTen?.toLowerCase())
    ))


    return (
        <div>

            <div className='text-start mt-3 d-flex gap-5'>

                <input
                    type="text"
                    placeholder='Search Họ tên sinh viên'
                    className='form-control'
                    value={inputValue || ''}
                    onChange={(event) => {
                        // Lấy giá trị từ ô input:
                        setInputValue(event.target.value)
                    }}


                />

                <button
                    className='btn btn-primary'
                    onClick={() => {
                        setQueryParam({
                            hoTen: inputValue || undefined,
                            // Nếu ô input là rỗng => trả về undefined
                            // => không đưa lên url
                        })
                    }}

                >Search</button>
            </div>
            <table className="table mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (queryParam?.hoTen ? hoTenSearch : productList).map(item => (
                            <tr key={item?.maSV}>
                                <td>{item?.maSV}</td>
                                <td>{item?.hoTen}</td>
                                <td>{item?.soDienThoai}</td>
                                <td>{item?.email}</td>
                                <td style={{ maxWidth: 100 }}>
                                    <div className='d-flex gap-3'>

                                        <button
                                            className="btn btn-success"
                                            onClick={() => {
                                                dispatch(baiTapFormAction.editProduct(item))
                                            }}
                                        >Edit</button>

                                        <button
                                            className="btn btn-danger"
                                            data-bs-toggle='modal'
                                            data-bs-target='#confirmDelete'

                                            onClick={() => {
                                                handleMaSVDelete(item.maSV)
                                            }}



                                            // onClick={() => {
                                            //     dispatch(baiTapFormAction.deleteProduct(item.maSV))
                                            // }}

                                        >Delete</button>

                                    </div>
                                </td>

                            </tr>

                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Table