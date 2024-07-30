document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const codigosPermitidos = new Set(['1490', '2390']); // Códigos válidos

    // Cargar carnetSet desde localStorage o inicializarlo si no existe
    const carnetSet = new Set(JSON.parse(localStorage.getItem('carnetSet')) || []);

    form.addEventListener('submit', function(event) {
        const codigo = document.getElementById('codigo').value;
        const anio = document.getElementById('anio').value;
        const correlativo = document.getElementById('correlativo').value;
        const fechaNac = document.getElementById('FechNac').value;
        const gmail = document.getElementById('Gmail').value;

        // Validar carnet único
        const carnet = `${codigo}-${anio}-${correlativo}`;
        if (carnetSet.has(carnet)) {
            alert('El número de carnet ya ha sido registrado.');
            event.preventDefault();
            return;
        }
        carnetSet.add(carnet);

        // Guardar carnetSet en localStorage
        localStorage.setItem('carnetSet', JSON.stringify(Array.from(carnetSet)));

        // Validar código permitido
        if (!codigosPermitidos.has(codigo)) {
            alert('El código de carnet no es válido. Solo se permiten los códigos 1490 y 2390.');
            event.preventDefault();
            return;
        }

        // Validar fecha de nacimiento
        if (fechaNac) {
            const fecha = new Date(fechaNac);
            const currentYear = new Date().getFullYear();
            if (fecha.getFullYear() > 2024) {
                alert('El año de nacimiento no puede ser mayor a 2024.');
                event.preventDefault();
                return;
            }
        }

        // Validar correo electrónico
        if (!gmail.includes('@')) {
            alert('El correo electrónico debe contener el símbolo @.');
            event.preventDefault();
            return;
        }

        // Validar campos vacíos y longitud razonable
        const fields = {
            'Primer Nombre': document.getElementById('PrimNom').value,
            'Segundo Nombre': document.getElementById('SegNom').value,
            'Primer Apellido': document.getElementById('primAp').value,
            'Segundo Apellido': document.getElementById('SegAp').value,
            'DNI': document.getElementById('ValNDI').value,
            'Pasaporte': document.getElementById('ValPasaporte').value,
            'Dirección': document.getElementById('Direccion').value,
        };

        for (const [label, value] of Object.entries(fields)) {
            if (value.trim() === '') {
                alert(`${label} no puede estar vacío.`);
                event.preventDefault();
                return;
            }
        }

        // Validar longitud de campos
        if (fields['DNI'].length < 6 || fields['DNI'].length > 12) {
            alert('El DNI debe tener entre 6 y 12 dígitos.');
            event.preventDefault();
            return;
        }
        if (fields['Pasaporte'].length < 6 || fields['Pasaporte'].length > 20) {
            alert('El pasaporte debe tener entre 6 y 20 caracteres.');
            event.preventDefault();
            return;
        }
        if (fields['Dirección'].length < 10 || fields['Dirección'].length > 100) {
            alert('La dirección debe tener entre 10 y 100 caracteres.');
            event.preventDefault();
            return;
        }
    });

    // Función para validar el año del carnet
    window.validarAnio = function(input) {
        // Eliminar caracteres no numéricos
        input.value = input.value.replace(/\D/g, '');
    
        // Limitar a dos dígitos
        if (input.value.length > 2) {
            input.value = input.value.slice(0, 2);
        }
    
        // Validar que el año esté en el rango permitido (00-24)porque no hay estudiantes con carnet 25
        const anio = parseInt(input.value, 10);
        if (anio > 24) {
            alert('El año debe estar entre 00 y 24.');
            input.value = '';
        }
    }
    
});
