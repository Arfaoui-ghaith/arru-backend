const models = require('./../../models/index');

exports.codeCommune = (gouvernorat_code,nom_commune) => {
    return (gouvernorat_code+'_'+nom_commune.slice(0,4)).toUpperCase();
};

exports.codeProjet= (commune_code, nom="", tranche="") => {
    return (commune_code+'_'+nom.slice(0,3)+tranche).toUpperCase();
}

exports.codeQuartier =  (commune_code,nom) => {
    return (commune_code+'_'+nom.slice(0,3)).toUpperCase();
}

exports.codeInfrastructure = (projet_code, type) => {
    return (projet_code+'_I').toUpperCase();
}

exports.codeEtude = (projet_id) => {
    return (projet_id+'_E').toUpperCase();
}
