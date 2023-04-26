import axios from "axios";

interface createData {
    data: any
}


const API_URL = 'https://643cfabcf0ec48ce904e5df1.mockapi.io'

export const getAllData = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data
}

export const getDataById = async (id:number) => {
    const response = await axios.get(`${API_URL}/products/${id}`)
    return response.data
}

export const createData = async (data:createData) => {
    const response = await axios.post(`${API_URL}/products`, data);
    return response.data
}

export const updateData = async (id: number, data:createData) => {
    const response = await axios.post(`${API_URL}/products/${id}`,data)
    return response.data
}

export const deleteData = async(id:number) => {
    const response = await axios.delete(`${API_URL}/products/${id}`)
    return response.data

}
