const DOGS_URL = "http://localhost:3000/dogs";

// get dogs
function getDogs() {
  return fetch(DOGS_URL).then(resp => resp.json());
}

// update dogs
function editDog(dog) {
  return fetch(`${DOGS_URL}/${dog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog)
  }).then(resp => resp.json());
}
