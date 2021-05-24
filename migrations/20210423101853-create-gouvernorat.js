'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gouvernorats', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nom_fr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nom_ar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.bulkInsert('gouvernorats', [
    {
        id: uuidv4(),
        code: "ARI",
        nom_fr: "Ariana",
        nom_ar: "أريانة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "BEJ",
        nom_fr: "Béja",
        nom_ar: "باجة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "BIZ",
        nom_fr: "Bizerte",
        nom_ar: "بنزرت",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
      code: "ARO",
      nom_fr: "Ben Arous",
      nom_ar: "بن عروس",
      createdAt: new Date(),
        updatedAt: new Date(),
  },
    {
        id: uuidv4(),
        code: "GAB",
        nom_fr: "Gabès",
        nom_ar: "قابس",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "GAF",
        nom_fr: "Gafsa",
        nom_ar: "قفصة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "JEN",
        nom_fr: "Jendouba",
        nom_ar: "جندوبة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "KAI",
        nom_fr: "Kairouan",
        nom_ar: "القيروان",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "KAS",
        nom_fr: "Kasserine",
        nom_ar: "القصرين",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "KEB",
        nom_fr: "Kébili",
        nom_ar: "قبلي",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "KEF",
        nom_fr: "Le Kef",
        nom_ar: "الكاف",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "MAH",
        nom_fr: "Mahdia",
        nom_ar: "المهدية",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "MAN",
        nom_fr: "La Manouba",
        nom_ar: "منوبة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "MED",
        nom_fr: "Médenine",
        nom_ar: "مدنين",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "MON",
        nom_fr: "Monastir",
        nom_ar: "المنستير",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "NAB",
        nom_fr: "Nabeul",
        nom_ar: "نابل",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "SFA",
        nom_fr: "Sfax",
        nom_ar: "صفاقس",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "Scode",
        nom_fr: "Scodei Bouzcode",
        nom_ar: "سيدي بوزيد",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "SIL",
        nom_fr: "Siliana",
        nom_ar: "سليانة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "SOU",
        nom_fr: "Sousse",
        nom_ar: "سوسة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "TAT",
        nom_fr: "Tataouine",
        nom_ar: "تطاوين",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "TOZ",
        nom_fr: "Tozeur",
        nom_ar: "توزر",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "TUN",
        nom_fr: "Tunis",
        nom_ar: "تونس العاصمة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        code: "ZAG",
        nom_fr: "Zaghouan",
        nom_ar: "زغوان",
        createdAt: new Date(),
        updatedAt: new Date(),
    }    
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('gouvernorats');
  }
};