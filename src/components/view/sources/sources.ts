import './sources.css';
import { Source } from '../../../types';

class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sources = document.querySelector<HTMLElement>('.sources');
        if (!sourceItemTemp || !sources) return;

        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) return;

            const sourceItemName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
            if (!sourceItemName || !sourceItem) return;

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id || '');

            fragment.append(sourceClone);
        });
        sources.innerHTML = '';
        sources.append(fragment);
    }
}

export default Sources;
