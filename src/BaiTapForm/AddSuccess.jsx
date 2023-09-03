import React from 'react'

const ModalAdd = () => {

    return (
        <div className="modal fade" id="addSuccess" style={{top: '30%'}} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-5" id="exampleModalLabel">

                            <i className="fa-regular fa-circle-check text-success fs-4 me-3"></i>

                            Thêm sinh viên thành công

                        </h5>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default ModalAdd