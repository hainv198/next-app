import About from "@/pages/about";
import React, {useEffect, useState} from "react";
import axios from "axios";


type Props = {

};
interface Product {
    id:number,
    body:string,
    title:string
}

export default function Home({}:Props):React.ReactElement {

    const [user, setUser] = useState<Product[]>([]);

    useEffect(()=> {
        const dataName = async() => {
            try {
                const result = await axios.get<Product[]>('https://jsonplaceholder.typicode.com/posts');
                // console.log(result.data)
                setUser(result.data);
            }catch (e) {
                console.log(e.message)
            }
        }
        dataName();
    },[])

  return (
      <>
        <h1>Product List</h1>
          <About/>
      </>
  )
}

