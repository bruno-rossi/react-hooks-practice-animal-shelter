// Deliverables
// A user should be able to change the Animal Type filter/drop down to specify the type of animal they want to adopt.
// A user should be able to click on the 'Find pets' button, and they will see all of pets only for the type they specified in the drop down (you'll be fetching to a mock API to get this data).
// A user can click on 'Adopt' to adopt that pet. They cannot un-adopt it. No backsies!

// root
// └── App (states: pets, filters; has a filteredPets variable; fetch pets)
//      ├── Filters (prop: onChangeType callback function to setFilters; onFindPetsClick when the user clicks the button)
//      └── PetBrowser (props: fetched pets array, onAdoptPet, maps it as JSX)
//          └── Pet (props: pet)

import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onChangeType(event) {
    setFilters({ type: event.target.value });
  }

  function onFindPetsClick() {
    console.log("click");

    let url = "http://localhost:3001/pets";

    if (filters.type !== "all") {
      url += `?type=${filters.type}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(petsArray => {
        setPets(petsArray);
        console.log(petsArray);
      });
  }

  function handleAdoptPet(id) {
    const updatedPets = pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    setPets(updatedPets);
  }

  // Use effect to fetch data from db one time.
  useEffect(() => {
    fetch("http://localhost:3001/pets")
    .then(response => response.json())
    .then(data => {
      setPets(data);
    })
  }, []);


  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;