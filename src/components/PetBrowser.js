import React from "react";
import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {
  console.log("PetBrowser render");

  const petCards = pets.map(pet => {
    return <Pet key={pet.id} pet={pet} onAdoptPet={onAdoptPet} />
  })
  return <div className="ui cards">{petCards}</div>;
}

export default PetBrowser;