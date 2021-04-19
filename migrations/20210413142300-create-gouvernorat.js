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
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
        nom_ar: "أريانة"
    },
    {
        id: "BEJ",
        nom_fr: "Béja",
        nom_ar: "باجة"
    },
    {
        id: "BIZ",
        nom_fr: "Bizerte",
        nom_ar: "بنزرت"
    },
    {
      id: "ARO",
      nom_fr: "Ben Arous",
      nom_ar: "بن عروس"
  },
    {
        id: "GAB",
        nom_fr: "Gabès",
        nom_ar: "قابس"
    },
    {
        id: "GAF",
        nom_fr: "Gafsa",
        nom_ar: "قفصة"
    },
    {
        id: "JEN",
        nom_fr: "Jendouba",
        nom_ar: "جندوبة"
    },
    {
        id: "KAI",
        nom_fr: "Kairouan",
        nom_ar: "القيروان"
    },
    {
        id: "KAS",
        nom_fr: "Kasserine",
        nom_ar: "القصرين"
    },
    {
        id: "KEB",
        nom_fr: "Kébili",
        nom_ar: "قبلي"
    },
    {
        id: "KEF",
        nom_fr: "Le Kef",
        nom_ar: "الكاف"
    },
    {
        id: "MAH",
        nom_fr: "Mahdia",
        nom_ar: "المهدية"
    },
    {
        id: "MAN",
        nom_fr: "La Manouba",
        nom_ar: "منوبة"
    },
    {
        id: "MED",
        nom_fr: "Médenine",
        nom_ar: "مدنين"
    },
    {
        id: "MON",
        nom_fr: "Monastir",
        nom_ar: "المنستير"
    },
    {
        id: "NAB",
        nom_fr: "Nabeul",
        nom_ar: "نابل"
    },
    {
        id: "SFA",
        nom_fr: "Sfax",
        nom_ar: "صفاقس"
    },
    {
        id: "SID",
        nom_fr: "Sidi Bouzid",
        nom_ar: "سيدي بوزيد"
    },
    {
        id: "SIL",
        nom_fr: "Siliana",
        nom_ar: "سليانة"
    },
    {
        id: "SOU",
        nom_fr: "Sousse",
        nom_ar: "سوسة"
    },
    {
        id: "TAT",
        nom_fr: "Tataouine",
        nom_ar: "تطاوين"
    },
    {
        id: "TOZ",
        nom_fr: "Tozeur",
        nom_ar: "توزر"
    },
    {
        id: "TUN",
        nom_fr: "Tunis",
        nom_ar: "تونس العاصمة"
    },
    {
        id: "ZAG",
        nom_fr: "Zaghouan",
        nom_ar: "زغوان"
    }    
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('gouvernorats');
  }
};