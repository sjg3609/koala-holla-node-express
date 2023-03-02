console.log( 'js' );

document.querySelector('#nameIn').value = '';
document.querySelector('#ageIn').value = '';
document.querySelector('#genderIn').value = '';
document.querySelector('#readyForTransferIn').value = '';
document.querySelector('#notesIn').value = '';

let i = 6;

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  let koalaTable = document.querySelector('#viewKoalas');
  axios.get('/koalas').then((response) => {
    console.log(response);
    let koalas = response.data;
    koalaTable.innerHTML = '';

    for(let koala of koalas) {
      koalaTable.innerHTML += `
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button>Ready for Transfer</button></td>
        <td><button onClick="deleteKoala(${koala.id})">Delete</button></td>
      </tr>
      `;
    }   
  }).catch((error) => {
    console.log(error);
    alert('Something went wrong.');
  });
  
} // end getKoalas

function saveKoala(){
  console.log( 'in saveKoala' );
  i++;
  let id = i;
  let name = document.querySelector('#nameIn').value;
  let age = document.querySelector('#ageIn').value;
  let gender = document.querySelector('#genderIn').value;
  let ready_to_transfer = document.querySelector('#readyForTransferIn').value;
  let notes = document.querySelector('#notesIn').value;
  let koalasToAdd = {
    id: id,
    name: name,
    age: age,
    gender:gender,
    ready_to_transfer: ready_to_transfer,
    notes: notes
  };
  console.log(koalasToAdd);
  // axios call to server to get koalas
  axios.post('/koalas', koalasToAdd).then((response) => {
      console.log(response);
      getKoalas();
  }).catch((error) => {
    console.log(error);
    alert('Something went wrong.');
  })
 
}

function deleteKoala(index) {
  console.log(`Deleting koala at ${index}`);
  axios.delete(`/koalas/${index}`).then((response) => {
    console.log(response);
    getKoalas();
  }).catch((error) => {
        console.log(error);
        alert('Something went wrong!');
  });
}

getKoalas();
