import './sources.css';
import { Source, Options } from '../../../types';
import Storage from '../../controller/storage';

class Countries {
    draw(data: Source[]): void {
        const option = document.createElement('option');
        const countries = document.querySelector<HTMLElement>('.countries select');
        const savedOptions = Storage.load<Options>('options');

        const dataCountry = Array.from(new Set(data.map((x) => x.country)));

        if (!countries) return;

        dataCountry.forEach((item) => {
            const countryClone = option.cloneNode(true);
            if (!(countryClone instanceof HTMLOptionElement)) return;

            const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });
            countryClone.textContent = countryNames.of(item.toUpperCase()) || item;
            countryClone.dataset.country = item;

            if (item === savedOptions?.country) {
                countryClone.selected = true;
            }

            countries.append(countryClone);
        });
    }
}

export default Countries;
