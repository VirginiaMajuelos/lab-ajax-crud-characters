const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

 window.addEventListener('load', () => {

///////////////MOSTRAR TODOS LOS ELEMENTOS ///////////////////

  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI.getFullList()
        .then(res => {
            const charactersUL = document.querySelector(".characters-container")
            console.log(res)

            let charactersInfo = ""
            res.data.reverse().forEach(character => {
                charactersInfo += `<div class= "character-info">Id: ${character.id} </br> Nombre: ${character.name} </br> 
                Ocupación: ${character.occupation} </br> 
                Arma: ${character.weapon}</div>`
            });

            charactersUL.innerHTML = charactersInfo
        })
        .catch(err => console.log(err))
});

///////////////MOSTRAR UN ELEMENTO POR ID ///////////////////

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const id = document.getElementById("character-id").value
    charactersAPI.getOneRegister(id)
    .then(res => {
      const characterOne = document.querySelector(".characters-container")
            console.log(res)
      let charactersInfo= ""
        charactersInfo =`<div class= "character-info">  Nombre: ${res.data.name} </br> 
                Ocupación: ${res.data.occupation} </br> Cartoon: ${res.data.cartoon} </br>
                Arma: ${res.data.weapon}</div>`
      characterOne.innerHTML = charactersInfo
      })
    .catch(err => console.log(err))
    })

});

///////////////ELIMINAR ELEMENTOS ///////////////////

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const id = document.getElementById("character-delete").value
    charactersAPI.deleteOneRegister(id)
    });
 

/////////////// EDITAR ////////////////

 document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const editFormInputs = document.querySelectorAll("#edit-character-form input")
    const name = editFormInputs[1].value
    const occupation = editFormInputs[2].value
    const weapon = editFormInputs[3].value
    const id = editFormInputs[0].value
    const cartoon = editFormInputs[4].checked
    const info = { name, occupation, weapon, cartoon }
  
    charactersAPI.updateOneRegister(id, info)
        .then(res => {
      const characterOne = document.querySelector(".characters-container")
            console.log(res)
      let charactersInfo= ""
        charactersInfo =`<div class= "character-info">  Nombre: ${res.data.name} </br> 
                Ocupación: ${res.data.occupation} </br> Cartoon: ${res.data.cartoon} </br>
                Arma: ${res.data.weapon}</div>`
      characterOne.innerHTML = charactersInfo
      
        })
        .catch(err => console.log(err))

}
  );

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()
  const createformImputs = document.querySelectorAll("#new-character-form input")

    const name = createformImputs[0].value
    const occupation = createformImputs[1].value
    const weapon = createformImputs[2].value
    const cartoon = createformImputs[3].cheked

  charactersAPI.createOneRegister({ name, occupation, weapon, cartoon})
  
  });


