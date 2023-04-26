import React, {Fragment, useEffect, useState} from 'react';
import {createData, deleteData, getAllData} from "@/conect_api/api";
import axios from "axios";


//khai bao kieu cho state
type Data = {
    id:number,
    name:string,
    price:number,
    description: string
}

const About = () => {
    const [dataList, setDataList] = useState<Data[]>([]);
    const [newData, setNewData] = useState<Data>({id:0, name:'', description:'',price:0})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllData()
                setDataList(data)
            }catch (err) {
                alert(err)
            }
        }
        fetchData();
    },[])
    //ChangeData
    function changeData(event) {
        event.preventDefault()
        setNewData({
            ...newData, [event.target.name]: event.target.value
        })
        console.log(event.target.value)
    }

    //Add new item
    /*const handleCreate = async (newData) => {
        try {
            const addData = await createData(newData)
            setDataList([...dataList, addData])
            setNewData({ id: 0, name: '', description: '',price:0 });

        }catch (err) {
            console.log(err)
        }
    }*/

    async function handleCreate() {
        try {
            const response = await axios.post('https://643cfabcf0ec48ce904e5df1.mockapi.io/products', newData);
            setDataList([...dataList, response.data]);
            setNewData({id:0, name: '',price:0, description: '' });
        } catch (error) {
            console.error(error);
        }
    }

    //update

    const handleUpdate = async(id:number, updatedData) => {
        try {
            const response = await axios.put('https://643cfabcf0ec48ce904e5df1.mockapi.io/products/' + id,updatedData)
            const updateList = dataList.map((data) => {
                if (data.id === id) {
                    return response.data
                }
                return data
            })
            setDataList(updateList)
        }catch (err) {
            console.log(err)
        }
    }


    //Delete item
    const handleDelete = async (id:number) => {
        const newData = dataList.filter((data) => data.id !== id)
        setDataList(newData)
        await
            alert('ban muon xoa')
            deleteData(id)
        console.log('delete ssss' + ' ' + id)
    }
    return (
        <Fragment>
            <div>Data List </div>
            <div>
                <div>
                    <div>
                        <label>Name</label> <br/>
                        <input className="border outline-0" type="text" name="name" value={newData.name} onChange={changeData} />
                    </div>
                    <div>
                        <label>Price</label> <br/>
                        <input className="border outline-0" type="number" name="price" value={newData.price} onChange={changeData} />
                    </div>
                    <div>
                        <label>Description</label> <br/>
                        <input className="border outline-0" type="text" name="description" value={newData.description} onChange={changeData} />
                    </div>
                </div>
            </div>
            <br/>
            <button className="border" onClick={handleCreate}>Add Data</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td className="border">
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleUpdate(item.id, { ...item, name: e.target.value })}
                                />
                            </td>
                            <td className="border">
                                <input
                                    type="text"
                                    value={item.price}
                                />
                            </td>
                            <td>
                                <button className="border p-1">Edit</button>
                            </td>
                            <td>
                                <button
                                    onClick={()=> handleDelete(item.id)}
                                    className="border p-1">
                                    Delete
                                </button>
                            </td>

                        </tr>

                    ))}
                    {/*{dataList ? (

                    ) : (
                        <p>Loading...</p>
                    )}*/}
                </tbody>
            </table>
            <div>

            </div>
        </Fragment>
    );
};

export default About;