const calculate = document.querySelector('#calculate');
if (calculate) {
    calculate.addEventListener('click', calculateTime);
}

function calculateTime() {
    const time1 = document.querySelector('#time1').value;
    const time2 = document.querySelector('#time2').value;
    const operation = document.querySelector('#operation').value;

    if (!time1 || !time2) {
        alert('Por favor, ingrese ambas horas');
        return;
    }

    // Convertir las horas a minutos para facilitar los cálculos
    const minutes1 = timeToMinutes(time1);
    const minutes2 = timeToMinutes(time2);

    // Realizar la operación
    let resultMinutes;
    if (operation === '+') {
        resultMinutes = minutes1 + minutes2;
    } else {
        resultMinutes = minutes1 - minutes2;
    }

    // Convertir el resultado de vuelta a formato de hora
    const result = minutesToTime(resultMinutes);
    document.getElementById('result').textContent = result;
}

function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
    // Manejar números negativos
    const isNegative = totalMinutes < 0;
    totalMinutes = Math.abs(totalMinutes);
    
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    // Formatear la hora
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    
    return `${isNegative ? '-' : ''}${formattedHours}:${formattedMinutes}`;
}
