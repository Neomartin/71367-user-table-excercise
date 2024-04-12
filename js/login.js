const formHTML = document.querySelector("#login")
// Localstorage tenemos la lista de usuarios
console.log(formHTML)

// Leer el localStorage para obtener los user y guardarlos en una variable
const users = JSON.parse(localStorage.getItem("usuarios"))
// Escuchar el evento submit
formHTML.addEventListener("submit", function (evento) {
    // Debemos prevenir el comportamiento por defecto
    evento.preventDefault()
    // Tomar los datos del formulario
    const el = formHTML.elements;
    const emailInput = el.email.value;
    const passwordInput = el.password.value;
    // Verificar el usuario
    // Recorrer el array de usuarios si existe un user con el email que tomamos tomamos del input (find)
    // const user = users.find((usr) => usr.email === emailInput)
    const user = users.find((usr) => {
        if (usr.email.toLoweCase() === emailInput.toLoweCase()) {
            return true
        }
        return false
    })

    // ❌ Si no encontré usuario indicar mediante algún mensaje que algo no salió bien
    // ✅ Verificamos que el password ingresado en el form sea igual al password del user que encontramos con find
    if (!user || user.password !== passwordInput) {
        Swal.fire({
            title: "Error al ingresar",
            text: "Alguno de los datos no son correctos",
            icon: "error"
        })
        return
    }
    // Indicar que el login fue correcto
    Swal.fire({
        title: "Login correcto",
        text: "En breve será redirigido",
        icon: "success"
    })

    //delete user.password;
    user.password = undefined;
    // Guardar el usuario en el localStorage ("user", "currentUser")
    localStorage.setItem("user", JSON.stringify(user))

    // Redirigir al usuario al index
    setTimeout(function () {

        window.location.href = "/"

    }, 2000)

})
