import './sources.css';
import { Source, Options } from '../../../types';
import Storage from '../../controller/storage';

class Categories {
    draw(data: Source[]): void {
        const option = document.createElement('option');
        const categories = document.querySelector<HTMLElement>('.categories select');
        const savedOptions = Storage.load<Options>('options');

        const dataCategory = Array.from(new Set(data.map((x) => x.category)));

        if (!categories) return;

        dataCategory.forEach((item) => {
            const categoryClone = option.cloneNode(true);
            if (!(categoryClone instanceof HTMLOptionElement)) return
            categoryClone.textContent = item;
            categoryClone.dataset.category = item;
            if (item === savedOptions?.category) {
                categoryClone.selected = true;
            }

            categories.append(categoryClone);
        });
    }
}

export default Categories;
