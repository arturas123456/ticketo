const { sequelize } = require('./models');

async function setup() {
    try {
        await sequelize.sync({ force: true });
        console.log('Duomenų bazės lentelės sėkmingai sukurtos.');
        process.exit(0);
    } catch (err) {
        console.error('Klaida kuriant lenteles:', err);
        process.exit(1);
    }
}

setup();
