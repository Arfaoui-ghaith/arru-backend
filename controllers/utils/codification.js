exports.codeCommune = async (gouvernorat_id,nom_commune) => {
    if(nom_commune.slice(0,4).includes(' ')){
        return gouvernorat_id+'-'+nom_commune.slice(nom_commune.indexOf(' ')+1,4).trim();
    }
    return gouvernorat_id+'-'+nom_commune.slice(0,4).trim();
};

exports.codeQuartier = async (commune_id,nom_quartier) => {
    if(nom_quartier.slice(0,3).includes(' ')){
        return commune_id+'-'+nom_quartier.slice(nom_quartier.indexOf(' ')+1,3).trim();
    }
    return commune_id+'-'+nom_quartier.slice(0,3).trim();
}

exports.codeDrainage = async (infrastructure_id) => {
    return infrastructure_id+'-D';
}

exports.codeAssainissement = async (infrastructure_id) => {
    return infrastructure_id+'-A';
}

exports.codeEclairage = async (infrastructure_id) => {
    return infrastructure_id+'-EC';
}

exports.codeEauPotable = async (infrastructure_id) => {
    return infrastructure_id+'-EA';
}

exports.codeVoirie = async (infrastructure_id) => {
    return infrastructure_id+'-V';
}