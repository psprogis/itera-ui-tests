
const Base = require('./Base');

class VacanciesPage extends Base {

    async getAllVacancies() {
        const vacanciesRoot = $('section.bg--gray div.container--list');
        const vacancies = [];

        await vacanciesRoot.$$('.block--vacancy').each(async (el) => {
            const title = await el.$('.vacancy__title').getText();

            vacancies.push({ title });
        });

        return vacancies;
    }
}

module.exports = VacanciesPage;
