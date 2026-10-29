import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Options, DefaultOptions } from '../../types';
import Storage from '../controller/storage';

class App {
    private controller: AppController;
    private view: AppView;
    private defaultOptions: DefaultOptions = {
        country: 'us',
        category: 'general',
    };

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const countrySelector = document.querySelector<HTMLSelectElement>('.countries');
        const categorySelector = document.querySelector<HTMLSelectElement>('.categories');
        const sourceElement = document.querySelector<HTMLElement>('.sources');
        if (!sourceElement || !countrySelector || !categorySelector) return;

        sourceElement.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );

        if (!localStorage.getItem('options')) {
            Storage.save('options', this.defaultOptions);
        }

        if (countrySelector) {
            countrySelector.addEventListener('change', (e: Event) => {
                const target = e.target as HTMLSelectElement;
                const selectedValue = target.selectedOptions[0].dataset.country || undefined;

                const current = Storage.load<Options>('options');
                Storage.save('options', { ...current, country: selectedValue });
                this.controller.getSources(
                    (data) => this.view.drawSources(data),
                    Storage.load<Options>('options') || undefined
                );
            });
        }
        if (categorySelector) {
            categorySelector.addEventListener('change', (e: Event) => {
                const target = e.target as HTMLSelectElement;
                const selectedValue = target.selectedOptions[0].dataset.category || undefined;
                const current = Storage.load<Options>('options');

                Storage.save('options', { ...current, category: selectedValue });
                this.controller.getSources(
                    (data) => this.view.drawSources(data),
                    Storage.load<Options>('options') || undefined
                );
            });
        }
        this.controller.getSources((data) => this.view.drawCountries(data));
        this.controller.getSources((data) => this.view.drawCategories(data));
        this.controller.getSources(
            (data) => this.view.drawSources(data),
            Storage.load<Options>('options') || undefined
        );
    }
}

export default App;
