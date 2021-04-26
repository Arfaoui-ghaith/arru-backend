const models = require('./../../models/index');
exports.codeCommune = (gouvernorat_id,nom_commune) => {
    console.log("commune: ",nom_commune);
    console.log("gouvernorat_id: ",gouvernorat_id);
    if(nom_commune.slice(0,4).includes(' ')){
        return gouvernorat_id+'-'+nom_commune.slice(nom_commune.indexOf(' ')+1,nom_commune.indexOf(' ')+5).trim().toUpperCase();
    }
    return gouvernorat_id+'-'+nom_commune.slice(0,4).trim().toUpperCase();
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

exports.codeQuartier =  (commune_id,nom_quartier) => {
    if(nom_quartier.slice(0,3).includes(' ')){
        return commune_id+'-'+nom_quartier.slice(nom_quartier.indexOf(' ')+1,3).trim();
    }
    return commune_id+'-'+nom_quartier.slice(0,3).trim().toUpperCase();
}

exports.codeCritere =  async (gouvernorat_id) => {
    const count = await models.Fiche_critere.count({ where: { gouvernorat_id } });
    return gouvernorat_id+'-FC'+count+1;
}

exports.codeInfrastructure = (projet_id, type) => {
    return projet_id+'-INF-'+type.slice(0,2).toUpperCase();
}
