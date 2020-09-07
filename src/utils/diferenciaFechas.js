const moment = require('moment');

const diffFechaInicioFin = (start, end, tipoMetrica) => {
    // tipoMetrica = 'hours';
    // tipoMetrica = 'minutes';
    // tipoMetrica = 'seconds';
    // tipoMetrica = 'milliseconds';
    const inicio = new moment(start);
    const fin = new moment(end);
    const duracion = moment.duration(fin.diff(inicio));
    
    return duracion.as(tipoMetrica);
}
