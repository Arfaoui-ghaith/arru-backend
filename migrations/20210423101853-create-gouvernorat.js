'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gouvernorats', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
        id: "ARI",
        nom_fr: "Ariana",
        nom_ar: "أريانة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "BEJ",
        nom_fr: "Béja",
        nom_ar: "باجة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "BIZ",
        nom_fr: "Bizerte",
        nom_ar: "بنزرت",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      id: "ARO",
      nom_fr: "Ben Arous",
      nom_ar: "بن عروس",
      createdAt: new Date(),
        updatedAt: new Date(),
  },
    {
        id: "GAB",
        nom_fr: "Gabès",
        nom_ar: "قابس",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "GAF",
        nom_fr: "Gafsa",
        nom_ar: "قفصة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "JEN",
        nom_fr: "Jendouba",
        nom_ar: "جندوبة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "KAI",
        nom_fr: "Kairouan",
        nom_ar: "القيروان",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "KAS",
        nom_fr: "Kasserine",
        nom_ar: "القصرين",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "KEB",
        nom_fr: "Kébili",
        nom_ar: "قبلي",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "KEF",
        nom_fr: "Le Kef",
        nom_ar: "الكاف",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "MAH",
        nom_fr: "Mahdia",
        nom_ar: "المهدية",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "MAN",
        nom_fr: "La Manouba",
        nom_ar: "منوبة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "MED",
        nom_fr: "Médenine",
        nom_ar: "مدنين",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "MON",
        nom_fr: "Monastir",
        nom_ar: "المنستير",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "NAB",
        nom_fr: "Nabeul",
        nom_ar: "نابل",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "SFA",
        nom_fr: "Sfax",
        nom_ar: "صفاقس",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "SID",
        nom_fr: "Sidi Bouzid",
        nom_ar: "سيدي بوزيد",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "SIL",
        nom_fr: "Siliana",
        nom_ar: "سليانة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "SOU",
        nom_fr: "Sousse",
        nom_ar: "سوسة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "TAT",
        nom_fr: "Tataouine",
        nom_ar: "تطاوين",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "TOZ",
        nom_fr: "Tozeur",
        nom_ar: "توزر",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "TUN",
        nom_fr: "Tunis",
        nom_ar: "تونس العاصمة",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "ZAG",
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