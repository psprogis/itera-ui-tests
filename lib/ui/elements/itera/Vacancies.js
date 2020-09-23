const Base = require('./Base');

class VacanciesPage extends Base {

    async getAllVacancies() {
        const vacanciesRoot = $('.container.container--vacancy');
        const vacancies = [];

        await vacanciesRoot.$$('.block--vacancy').each(async (el) => {
            const title = await el.$('.block-view').getText();

            vacancies.push({ title });
        });

        return vacancies;
    }
}

module.exports = VacanciesPage;
