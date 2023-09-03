import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    
    productList: [],

    productEdit: undefined,
}


const baiTapFormSlice  = createSlice ({
    name: 'baiTapForm',
    initialState,
    reducers: {
        addProduct: (state, {payload}) => {
            state.productList.push(payload)
        },
        deleteProduct: (state, {payload}) => {
            state.productList = state.productList.filter((prd) => prd.maSV !== payload)
        },
        editProduct: (state, {payload}) => {
            state.productEdit = payload
        },
        updateProduct: (state, {payload}) => {
            // C1:
            const index = state.productList.findIndex(prd => prd.maSV === payload.maSV)
            state.productList[index] = payload

            // C2:
            // state.productList = state.productList.map(prd => {
            //     if (prd.id === payload.id) {
            //         return payload
            //     }
            //     return prd
            // })

            // Sau khi update thành công:
            state.productEdit = undefined
        }
    }

})

export const {reducer: baiTapFormReducer, actions: baiTapFormAction} = baiTapFormSlice