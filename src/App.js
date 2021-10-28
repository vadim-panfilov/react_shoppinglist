import { useState, useEffect } from "react";
import axios from "axios";

const URL = 'http://localhost:8888/ostokset';

const getProducts = () => {
  return axios.get(URL + '/index.php', {
    headers:{
      'Content-Type': 'application/json'
  }
  })
};

const createProduct = (product) => {
  return axios.post(URL + "/save.php", product);
};

const deleteProduct = (id) => {
   return axios.get(URL + "/delete.php" + '?id=' + id);
};

function App() {
  const [products, setProducts] = useState([])
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
     getProducts().then(response => {
      setProducts(response.data)
    })
  }, [])

  const hanldleAdd = async () => {
    try {
      const response = await createProduct({description, amount})
      setDescription('')
      setAmount('')
      setProducts([response.data, ...products])
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const hanldleDelete = async (event, id) => {

    event.preventDefault()
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id))
      
    } catch (error) {
      console.log('error: ', error);
      
    }
  }


  return (
    <div>
      <h3>Shopping list</h3>
      <div style={{ marginBottom: 30, display: "flex", gap: 10 }}>
        <span>New item</span>
        <input
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          value={description}
          placeholder="type description"
        />
        <input
          onChange={(event) => {
            setAmount(event.target.value);
          }}
          value={amount}
          type="number"
          placeholder="type amount"
        />
        <button onClick={hanldleAdd}>Add</button>
      </div>
      <table>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.description}</td>
            <td>{product.amount}</td>
            <td>
              <a onClick={(event) => hanldleDelete(event, product.id)} href="#">
                Delete
              </a>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
