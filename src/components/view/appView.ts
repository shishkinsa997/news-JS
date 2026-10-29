import News from './news/news';
import Sources from './sources/sources';
import Countries from './sources/countries';
import Categories from './sources/categories';
import { ResponseNews, Response } from '../../types';

export class AppView {
    private news: News;
    private sources: Sources;
    private countries: Sources;
    private categories: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.countries = new Countries();
        this.categories = new Categories();
    }

    drawNews(data: ResponseNews) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Response) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    drawCountries(data: Response) {
        const values = data?.sources ? data?.sources : [];
        this.countries.draw(values);
    }
    drawCategories(data: Response) {
        const values = data?.sources ? data?.sources : [];
        this.categories.draw(values);
    }
}

export default AppView;
