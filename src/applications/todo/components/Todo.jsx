import React, { useState } from "react";
import "./style.css";

const Todo = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
  });
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAdd = () => {
    if (editId !== null) {
      const updatedData = data.map((item) =>
        item.id === editId ? { ...item, ...formData } : item,
      );
      setData(updatedData);
      setEditId(null);
    } else {
      const newData = {
        id: Date.now(),
        name: formData.name,
        age: formData.age,
        address: formData.address,
      };
      setData((prev) => [...prev, newData]);
      setFormData({
        name: "",
        age: "",
        address: "",
      });
    }
  };

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
  };

  const handleEdit = (id) => {
    const selectedData = data.find((item) => item.id === id);

    if (selectedData) {
      setFormData({
        name: selectedData.name,
        age: selectedData.age,
        address: selectedData.address,
      });
      setEditId(id);
    }
  };

  return (
    <div className="app-container">
      <h3>Todo application</h3>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Enter age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((elem) => (
              <tr key={elem.id}>
                <td>{elem.name}</td>
                <td>{elem.age}</td>
                <td>{elem.address}</td>
                <td>
                  <button onClick={() => handleEdit(elem.id)}>Edit</button>
                  <button onClick={() => handleDelete(elem.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
