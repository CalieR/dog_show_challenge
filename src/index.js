const dogTable = document.querySelector("#table-body");
const dogForm = document.querySelector("#dog-form");

function renderDog(dog) {
  const dogRow = document.createElement("tr");
  dogRow.className = "dog-row";
  dogRow.id = dog.id;

  dogRow.innerHTML = `
  <td>${dog.name}</td> <td>${dog.breed}</td> <td>${
    dog.sex
  }</td> <td><button class="btn-edit">Edit</button></td>
  `;

  dogTable.appendChild(dogRow);
  addDogTrListener(dog, dogRow);
}

// on click of edit button, set inner text of form with that dogs details.
function addDogTrListener(dog, dogRow) {
  dogRow.addEventListener("click", event => {
    // debugger;
    if (event.target.className == "btn-edit") {
      //get and pass the dog id so the correct record can be updated:
      const dogId = dog.id;

      dogForm.querySelector("[name=name]").value = dog.name;
      dogForm.querySelector("[name=breed]").value = dog.breed;
      dogForm.querySelector("[name=sex]").value = dog.sex;

      addEventListenerToSubmitBtn(dogId);
    }
  });
}

// event listener for edit dog form
function addEventListenerToSubmitBtn(dogId) {
  dogForm.addEventListener("submit", e => {
    e.preventDefault();
    // debugger;
    // updated dog object:
    const dog = {
      id: dogId,
      name: dogForm.querySelector("[name=name]").value,
      breed: dogForm.querySelector("[name=breed]").value,
      sex: dogForm.querySelector("[name=sex]").value
    };

    // 1 - patch request to dogs/id with new dog object
    editDog(dog)
      // 2 - get request to allDogs will re-render the whole table
      .then(init);
  });
}

function allDogs(dogs) {
  // after the promise has exectued so no flicker
  dogTable.innerHTML = "";
  dogs.forEach(renderDog);
}

function init() {
  getDogs().then(allDogs);
}

init();
