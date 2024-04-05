// Función para transformar un timestamp a una string fecha
function transformTimestampToDate(dateTimestamp) {
    // // Debe recibir un valor en timestamp
    // const date = new Date(dateTimestamp)
    // // Debe devolver una fecha en formato string 01/05/2024
    // let day = date.getDate();
    
    // if(day < 10) {
    //     day = "0" + day
    // }
    
    // let month = date.getMonth() + 1; // EL mes se devuelve arrancando con enero 0
    //                                 // El mes sea menor a 10 agregar el 0 delante
    // month = (month < 10) ? "0" + month : month

    // const year = date.getFullYear();

    // #Forma 2
    const dateFormat = new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })

    const date = dateFormat.format(dateTimestamp)

    return date;
}
// Función para calcular la edad del usuario a partir del bornDate
function calculateAge(dateTimestamp) {
    // Calcular la edad del usuario
        // 1- Realizar resta del timestamp actual co la fecha de nacimiento y trasnformar eso a años

        // 2- Transformar el timestamp a fecha y hacer calculos entre en año, el mes y el día

        // a. Obtener fecha actual en formato Date
        const nowDate = new Date();
        const nowYear = nowDate.getFullYear();
        const nowMonth = nowDate.getMonth();
        const nowDay = nowDate.getDate();

        // b. Transformar timestamp a formato Date
        const bornDate = new Date(dateTimestamp)
        const bornYear = bornDate.getFullYear();
        const bornDay = bornDate.getDate();
        const bornMonth = bornDate.getMonth();
        // c...

        let age = nowYear - bornYear;

        if(bornMonth > nowMonth) {
            age = age - 1;
            return age
        }

        if(bornMonth === nowMonth && bornDay > nowDay) {
            age = age - 1;
            return age
        }

        return age;
}

