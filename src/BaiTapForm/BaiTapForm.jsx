import React, { useState } from 'react'
import FormInfo from './FormInfo'
import Table from './Table'
import ModalAdd from './AddSuccess'
import ModalUpdate from './UpdateSuccess'
import ModalDelete from './ConfirmDelete'

const BaiTapForm = () => {

    const [maSVDelete, setMaSVDelete] = useState(0)
    const handleMaSVDelete = (maSV) => {
        setMaSVDelete(maSV)
    }


    return (

        <div className='container'>

            <FormInfo />

            <Table handleMaSVDelete={handleMaSVDelete} />

            <ModalAdd />

            <ModalUpdate />

            <ModalDelete maSVDelete={maSVDelete}/>
        </div>
    )
}

export default BaiTapForm