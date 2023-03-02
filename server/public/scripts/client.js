console.log( 'js' );

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  let koalaTable = document.querySelector('#viewKoalas');
  axios.get('/koalas').then((response) => {
    console.log(response);
    let koalas = response.data;
    for(let koala of koalas) {
      koalaTable.innerHTML += `
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button>Ready for Transfer</button></td>
        <td><button>Delete</button></td>
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
  // axios call to server to get koalas
 
}

getKoalas();
