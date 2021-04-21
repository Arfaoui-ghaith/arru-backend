const models = require('./../../models/index');
exports.codeCommune = (gouvernorat_id,nom_commune) => {
    console.log("commune: ",nom_commune);
    console.log("gouvernorat_id: ",gouvernorat_id);
    if(nom_commune.slice(0,4).includes(' ')){
        return gouvernorat_id+'-'+nom_commune.slice(nom_commune.indexOf(' ')+1,nom_commune.indexOf(' ')+5).trim().toUpperCase();
    }
    return gouvernorat_id+'-'+nom_commune.slice(0,4).trim().toUpperCase();
};

exports.codeProjet= async (commune_id, nom_projet, tranche='') => {
    let nom = nom_projet.slice(0,3);
    if(nom_projet.slice(0,3).includes(' ')){
        nom = nom_projet.slice(nom_projet.indexOf(' ')+1, nom_projet.indexOf(' ')+4).trim().replace(' ','_');
    }
    const count = await models.Projet.count({ where: { commune_id } });
    return (commune_id+'-'+nom+'-'+tranche+String.fromCharCode(65+count)).trim().toUpperCase();
}

exports.codeQuartier =  (commune_id,nom_quartier) => {
    if(nom_quartier.slice(0,3).includes(' ')){
        return commune_id+'-'+nom_quartier.slice(nom_quartier.indexOf(' ')+1,3).trim();
    }
    return commune_id+'-'+nom_quartier.slice(0,3).trim().toUpperCase();
}

exports.codeCritere =  (gouvernorat_id) => {
    const count = await models.Fiche_critere.count({ where: { gouvernorat_id } });
    return gouvernorat_id+'-FC'+count+1;
}

exports.codeInfrastructure = (projet_id) => {
    return projet_id+'-INF';
}

exports.codeEtude = (projet_id) => {
    return projet_id+'-ETU';
}

exports.codeLotissement = (projet_id) => {
    return projet_id+'-LOT';
}

exports.codeDrainage = (infrastructure_id) => {
    return infrastructure_id+'-D';
}

exports.codeAssainissement = (infrastructure_id) => {
    return infrastructure_id+'-A';
}

exports.codeEclairage = (infrastructure_id) => {
    return infrastructure_id+'-EC';
}

exports.codeEauPotable = (infrastructure_id) => {
    return infrastructure_id+'-EA';
}

exports.codeVoirie = (infrastructure_id) => {
    return infrastructure_id+'-V';
}