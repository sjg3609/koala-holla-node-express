console.log( 'js' );

document.querySelector('#nameIn').value = '';
document.querySelector('#ageIn').value = '';
document.querySelector('#genderIn').value = '';
document.querySelector('#readyForTransferIn').value = '';
document.querySelector('#notesIn').value = '';

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  let koalaTable = document.querySelector('#viewKoalas');
  axios.get('/koalas').then((response) => {
    console.log(response);
    let koalas = response.data;
    koalaTable.innerHTML = '';
    for(let koala of koalas) {
      if(koala.ready_to_transfer === 'N'){
        koalaTable.innerHTML += `
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button onClick="transferKoala(${koala.id}, 'Y')">Toggle Transfer Status</button></td>
        <td><button onClick="confimationButton(${koala.id})">Delete</button></td>
      </tr>
      `;
      }else if(koala.ready_to_transfer === 'Y'){
        koalaTable.innerHTML += `
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button onClick="transferKoala(${koala.id}, 'N')">Toggle Transfer Status</button></td>
        <td><button onClick="confimationButton(${koala.id})">Delete</button></td>
      </tr>
      `;
      }
    }   
  }).catch((error) => {
    console.log(error);
    alert('Something went wrong.');
  });
  
} // end getKoalas

function confimationButton(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "The Koala will be gone forever!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteKoala(id);
      Swal.fire(
        'Deleted!',
        'The Koala has been deleted.',
        'success'
      )
    }
  });
}

function saveKoala(){
  console.log( 'in saveKoala' );
  let name = document.querySelector('#nameIn').value;
  let age = document.querySelector('#ageIn').value;
  let gender = document.querySelector('#genderIn').value;
  let ready_to_transfer = document.querySelector('#readyForTransferIn').value;
  let notes = document.querySelector('#notesIn').value;
  let koalasToAdd = {
    name: name,
    age: age,
    gender: gender,
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

function transferKoala(index, newTransferStatus) {
  console.log(`Updating transfer status for koala with id: ${index}`);
  if(newTransferStatus === 'Y'){
    axios.put(`/koalas/transfer/${index}`).then((response) => {
      console.log(response);
      getKoalas();
    }).catch((error) => {
          console.log(error);
          alert('Something went wrong!');
    });
  }
  else if(newTransferStatus === 'N'){
    axios.put(`/koalas/untransfer/${index}`).then((response) => {
      console.log(response);
      getKoalas();
    }).catch((error) => {
          console.log(error);
          alert('Something went wrong!');
    });
  }
}

getKoalas();
