import React from 'react'
import { useDispatch } from 'react-redux'
import { baiTapFormAction } from '../store/slice'

const ModalDelete = ({maSVDelete}) => {

    const dispatch = useDispatch()


    return (
        <div className="modal fade" id="confirmDelete" style={{ top: '30%' }} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-5" id="exampleModalLabel">

                            <i className="fa-regular fa-circle-check text-success fs-4 me-3"></i>

                            Bạn muốn xóa ?

                        </h5>

                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                dispatch(baiTapFormAction.deleteProduct(maSVDelete))
                            }}
                            data-bs-dismiss="modal"
                        >Delete</button>

                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ModalDelete