export function formatarData(data) {
    var d = new Date(data),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate(),
        ano = d.getFullYear();

    if (mes.length < 2) mes = '0' + mes;
    if (dia.length < 2) dia = '0' + dia;

    return [dia, mes, ano].join('/');
}

export function formatarCampoData(data) {
    var d = new Date(data),
        ano = d.getFullYear(),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate();

    if (mes.length < 2) mes = '0' + mes;
    if (dia.length < 2) dia = '0' + dia;

    return [ano, mes, dia].join('-');
}

