import './news.css';
import { Article } from '../../../types';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsItemTemp || !newsContainer) return;

        news.forEach((item: Article, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) return;

            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            if (newsItem && idx % 2) newsItem.classList.add('alt');

            const metaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const metaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            const metaDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            const descTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            const descSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            const descContent = newsClone.querySelector<HTMLElement>('.news__description-content');
            const readLink = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (!metaPhoto || !metaAuthor || !metaDate || !descTitle || !descSource || !descContent || !readLink)
                return;

            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            metaAuthor.textContent = item.author || item.source.name;
            metaDate.textContent = item.publishedAt ? item.publishedAt.slice(0, 10).split('-').reverse().join('-') : '';

            descTitle.textContent = item.title;
            descSource.textContent = item.source.name;
            descContent.textContent = item.description;
            readLink.setAttribute('href', item.url || '#');

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
        if (newsContainer.childNodes.length === 0) {
            newsContainer.textContent = 'No results found for your search. Try changing the category or country';
        }
    }
}

export default News;
