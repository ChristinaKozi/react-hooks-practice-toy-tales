import React,{useState} from "react";

function ToyCard({ toy, onDeleteToy, onAddLike }) {
  const { id, name, image, likes } = toy
  const [newLikes, setNewLikes] = useState(likes)

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => onDeleteToy(id))
  }

  function handleLike(e) {
    const updatedLike = newLikes +1
    setNewLikes(updatedLike)
    fetch(`http://localhost:3001/toys/${id}`, {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedLike
      }),
    })
      .then(r=>r.json())
      .then(updatedLike=>onAddLike(updatedLike))
  }
  
  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button onClick={handleLike} className="like-btn">Like {"<3"}</button>
      <button onClick={handleDelete} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
