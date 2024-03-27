const users = [{
    fullname: 'John Doe',
    age: 30,
    email: 'admin@admin.com',
    id: '1',
    active: true,
    password: 'admin',
    bornDate: 725846400000,
    location: 'La Luna',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/7/71/Mk8iconyoshi.png?width=1280',
    role: 'ADMIN_ROLE'
  },
  {
    fullname: 'Jane Doe',
    age: 25,
    email: 'jane.doe@example.com',
    id: '2',
    active: false,
    password: 'password456',
    bornDate: 894326400000,
    location: 'Mendoza',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/f/f5/Mk8icondaisy.png?width=1280',
    role: 'CLIENT_ROLE'
  },
  {
    fullname: 'Alice Johnson',
    age: 35,
    email: 'alice.johnson@example.com',
    id: '3',
    active: true,
    password: 'password789',
    bornDate: new Date('1988-08-08').getTime(),
    location: 'Mendoza',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/1/1d/Mk8icontoadette.png?width=325'
  },
  {
    fullname: 'Michael Smith',
    age: 40,
    email: 'michael.smith@example.com',
    id: '4',
    active: false,
    password: 'password101',
    bornDate: new Date('1983-04-10').getTime(),
    location: 'San Luis',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/d/d1/Mk8iconrosalina.png?width=1280'
  },
  {
    fullname: 'Emily Johnson',
    age: 28,
    email: 'emily.johnson@example.com',
    id: '5',
    active: true,
    password: 'password202',
    bornDate: new Date('1995-02-15').getTime(),
    location: 'Córdoba',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/5/59/Mk8iconpeach.png?width=325'
  },
  {
    fullname: 'Daniel Lee',
    age: 34,
    email: 'daniel.lee@example.com',
    id: crypto.randomUUID(), // se va a generar automaticamente
    active: false,
    password: 'password303',
    bornDate: new Date('1989-07-07').getTime(),
    location: 'Buenos Aires',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/bf/Mk8iconmario.png?width=325'
  },
];

let isEditing;

const tableHTML = document.getElementById("table-container");
// Obtener el body de la tabla
const tableBodyHTML = document.getElementById("table-body");
const totalHTML = document.getElementById('total');
// Obtener el formulario del HTML
const userFormHTML = document.querySelector('#user-form');
// Obtenemos los elementos elementos del formulario para jugar con sus estilos según este editando o agregando un producto
const btnSumbitHTML = userFormHTML.querySelector('button[type="submit"]');
const formContainerHTML = document.querySelector(".user-form-container")


let userButtonsEdit;

renderUsers(users);



userFormHTML.addEventListener("submit", (evento) => {

  evento.preventDefault()

  const el = evento.target.elements

  if (el["password-repeat"].value !== el.password.value) {
    Swal.fire("Error", "Las contraseñas no coinciden", "warning")
    return // evito que se ejecuten las siguientes lineas si se ingreso a este if
  }

  // let id;

  // if(isEditing) {
  //   id = isEditing;
  // } else {
  //   id = crypto.randomUUID()
  // }

  const nuevoUsuario = {
    // Operador ternario
    id: isEditing ? isEditing : crypto.randomUUID(),

    fullname: el.fullname.value,
    email: el.email.value,
    password: el.password.value,
    location: el.location.value,
    image: el.image.value,
    // Transformo la fecha obtenida 2024-03-22 en un timestamp en milisegundos
    bornDate: new Date(el.bornDate.value).getTime(),
    // Obtengo el valor checked para obtener un booleano true o false según corresponda
    active: el.active.checked,
    // Tomo el valor como un tipo numérico
    // age: el.age.valueAsNumber
  }

  console.log(nuevoUsuario)

  // Debo establecer un condicional para saber si tengo que pushear o agregar un elemento al array (nuevo usuario) o si estoy editando y tengo que buscar un usuario y reemplazarlo
  if (isEditing) {
    // Buscar el usuario y reemplarlo
    const userIndex = users.findIndex(user => {
      return user.id === isEditing;
    })

    users[userIndex] = nuevoUsuario

  } else {
    // Agregar el usuario ya que es un user nuevo
    users.push(nuevoUsuario)
  }


  renderUsers(users)

  isEditing = undefined;
  // Formateamos el formulario
  formContainerHTML.classList.remove("form-edit")

  btnSumbitHTML.classList.add('btn-primary')
  btnSumbitHTML.classList.remove('btn-success')

  btnSumbitHTML.innerText = "Editar"
  // Limpiamos los input del formulario
  userFormHTML.reset()

  // Hacemos foco en el primer input del formulario
  el.fullname.focus();

})


function renderUsers(arrayUsers) {
  // Cada vez que llamamos la función renderUsers limpiamos el body de la tabla y volvemos a pintar
  tableBodyHTML.innerHTML = '';

  let total = 0;

  arrayUsers.forEach((user, index) => {

    total += user.age;

    tableBodyHTML.innerHTML += `<tr>
                                  <td class="user-image">
                                      <img src="${user.image}" alt="${user.fullname} avatar">
                                  </td>
                                  <td class="user-name">${user.fullname}</td>
                                  <td class="user-email">${user.email}</td>
                                  <td class="user-location">${user.location}</td>
                                  <td class="user-actions">
                                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">
                                      <i class="fa-solid fa-trash"></i>
                                    </button>
                                    <button class="btn btn-primary btn-sm" data-edit="${user.id}" >
                                      <i class="fa-solid fa-pencil"></i>
                                    </button>
                                  </td>
                                </tr>`
  }) // End forEach


  totalHTML.innerText = `$ ${total}`
  // Una vez que pintamos la tabla obtenemos todos los botones con el atributo data-edit y se los asignamos a la variable userButtonsEdit
  updateEditButtons()
}

function updateEditButtons() {
  userButtonsEdit = document.querySelectorAll('button[data-edit]');

  userButtonsEdit.forEach((btn) => {

    btn.addEventListener('click', (evt) => {

      const id = evt.currentTarget.dataset.edit;

      completeUserForm(id);
    })
  })
}

function completeUserForm(idUser) {

  isEditing = idUser;
  console.log(`Complete FORM ${idUser}`)
  // Buscar el usuario y obtenerlo 
  const user = users.find((usr) => {
    if (usr.id === idUser) {
      return true
    }
    // return false
  })
  // Considero el caso de no haber obtenido un usuario y corto la función pero además informa al usuario de mi
  if (!user) {
    alert("No se encontró usuario")
    return
  }

  // #Rellenar el formulario
  const el = userFormHTML.elements;

  el.fullname.value = user.fullname;
  el.email.value = user.email;
  el.password.value = user.password;
  el["password-repeat"].value = user.password;
  el.location.value = user.location;
  el.image.value = user.image;
  el.active.checked = user.active;
  el.bornDate.valueAsNumber = user.bornDate;
  // Obtengo el botón submit del formulario para cambiar sus estilos y el texto del botón


  // formContainerHTML.parentElement()

  formContainerHTML.classList.add("form-edit")

  btnSumbitHTML.classList.remove('btn-primary')
  btnSumbitHTML.classList.add('btn-success')

  btnSumbitHTML.innerText = "Editar"

}


function deleteUser(idUser) {
  // debería buscar el indice de ese elemento en el array
  const indice = users.findIndex((usr) => {
    // Voy a checkear cuando el idUser que es la persona que quiero borrar coincida con el id de mi usr
    if (usr.id === idUser) {
      return true
    }
  })
  // contemplar si el usuario no existia
  if (indice === -1) {
    // alert("El usuario no se encontró")
    Swal.fire({
      title: "Error al borrar",
      text: "No se pudo borrar el usuario",
      icon: "error"
    })
    return
  }
  // debería eliminar ese elemento del array
  users.splice(indice, 1)

  // debería volver a pintar la tabla
  renderUsers(users)
}

function inputSearch(evt) {
  // Tenemos que tomar lo que la persona ha escrito en el input
  console.log(evt.target.value)
  const search = evt.target.value.toLowerCase();
  // Luego deberiamos recorrer el array y filtrar por todos aquellos usuarios cuyo nombre coincida con la busqueda
  // Deberiamos pintar nuevamente la tabla con los resultados de la busqueda
  const filteredUsers = users.filter((usr) => {
    // Filter para devolver un usuario yo tengo que asegurarme de retornar un true bajo cierta condicion
    if (usr.fullname.toLowerCase().includes(search)) {
      return true;
    }
    return false;
  })
  renderUsers(filteredUsers)
}

function sortAsc() {
  const collator = new Intl.Collator(undefined, {
    sensitivity: 'base'
  })

  users.sort((a, b) => {
    return collator.compare(a.fullname, b.fullname)
  })

  renderUsers(users);
}

function sortDesc() {

  const collator = new Intl.Collator(undefined, {
    sensitivity: 'base'
  })

  users.sort((a, b) => {
    // #Método 2
    return collator.compare(b.fullname, a.fullname)

    // #Método 1
    // if(a.fullname.toLowerCase() < b.fullname.toLowerCase()) {
    //   return 1;  
    // }
    // if(a.fullname.toLowerCase() > b.fullname.toLowerCase()) {
    //   return -1;
    // }
    // return 0;
  })

  renderUsers(users);


}