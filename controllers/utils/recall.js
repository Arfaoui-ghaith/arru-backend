const models  = require('../../models/index');

exports.findAllUsers = async () => {

    const utilisateurs = await models.Utilisateur.findAll();
    return utilisateurs.findAllWithRoles();
    
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