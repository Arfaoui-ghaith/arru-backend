const models  = require('../../models/index');

exports.findAllUsers = async () => {

    const utilisateurs = await models.Utilisateur.findAll();
    return utilisateurs.findAllWithRoles();
    
};

exports.findAllRoles = async () => {

  const roles = await models.Role.findAll();
  return roles.findAllRolesDatails();
  
};

Array.prototype.findAllWithRoles = async function() {
  var users = new Array();
  for( const user of this ){

    let obj = {id: user.id, nom: user.nom, prenom: user.prenom, cin: user.cin, email: user.email, image: user.image, telephone: user.telephone};
    const roles = await models.sequelize.query("SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur",
    { 
        replacements: { utilisateur: user.id },
        type: models.sequelize.QueryTypes.SELECT 
    });

    obj.roles = roles;
    users.push(obj);
    
  }
  
  return users;
}

Array.prototype.findAllRolesDatails = async function() {
  var roles_specifications_fonctionalites = []
    for( const role of this ){

        let obj = {id: role.id, titre: role.titre};
        const specification = await models.sequelize.query("SELECT s.titre FROM `roles` as r, `roles_specifications` as rs, `specifications` as s WHERE r.id = :role AND r.id = rs.role_id AND rs.specification_id = s.id",
        { 
            replacements: { role: role.id },
            type: models.sequelize.QueryTypes.SELECT 
        });

        const fonctionalites = await models.sequelize.query("SELECT f.titre FROM `roles` as r, `roles_fonctionalites` as rf, `fonctionalites` as f WHERE r.id = :role AND r.id = rf.role_id AND rf.fonctionalite_id = f.id",
        { 
            replacements: { role: role.id },
            type: models.sequelize.QueryTypes.SELECT 
        });

        obj.specification = specification;
        obj.fonctionalites = fonctionalites
        roles_specifications_fonctionalites.push(obj);
        
    };
  
  return roles_specifications_fonctionalites;
}