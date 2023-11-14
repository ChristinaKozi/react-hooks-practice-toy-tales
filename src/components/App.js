import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(()=>{
    fetch('http://localhost:3001/toys')
      .then(r=>r.json())
      .then(data=>setToys(data))
  },[])

  function handleAddNewToy(newToy){
    const updatedToys=[...toys, newToy]
    setToys(updatedToys)
  }

  function handleDeleteToy(id){
    const filteredToys= toys.filter(toy => toy.id !== id)
    setToys(filteredToys)
  }

  function handleAddLike(updatedLike){
    const updatedList = toys.map(toy => {
      if (toy.id === updatedLike.id){
        return {...toy, likes: updatedLike.likes }
      }
      return toy
    })
    setToys(updatedList)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddNewToy={handleAddNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onAddLike={handleAddLike}/>
    </>
  );
}

export default App;
