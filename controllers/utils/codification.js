const models = require('./../../models/index');

exports.codeCommune = (gouvernorat_code,nom_commune) => {
    return gouvernorat_code+'_'+nom_commune.slice(0,4).toUpperCase();
};

exports.codeProjet= async (zone_intervention_id) => {
    return zone_intervention_id+'-PR';
}

exports.codeZone_Intervention=  (commune_id, nom_zone) => {
    let nom = nom_zone.slice(0,3);
    if(nom_zone.slice(0,3).includes(' ')){
        nom = nom_zone.slice(nom_zone.indexOf(' ')+1, nom_zone.indexOf(' ')+4).trim().replace(' ','_');
    }
    
    return (commune_id+'-'+nom.toUpperCase());
}

exports.codeQuartier =  (zone_intervention_id,nom_quartier) => {
    if(nom_quartier.slice(0,3).includes(' ')){
        return zone_intervention_id+'-'+nom_quartier.slice(nom_quartier.indexOf(' ')+1,3).trim();
    }
    return zone_intervention_id+'-'+nom_quartier.slice(0,3).trim().toUpperCase();
}

exports.codeCritere =  async (gouvernorat_id) => {
    const count = await models.Fiche_criteres.count({ where: { gouvernorat_id } });
    return gouvernorat_id+'-FC'+count+1;
}

exports.codeInfrastructure = (projet_id, type) => {
    return projet_id+'-INF-'+type.slice(0,2).toUpperCase();
}

exports.codeEtude = (projet_id) => {
    return projet_id+'-ET';
}
