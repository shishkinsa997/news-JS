import AppLoader from './appLoader';
import { ResponseNews, Response } from '../../types';

class AppController extends AppLoader {
    getSources(callback: (data: Response) => void): void {
        super.getResp<Response>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: ResponseNews) => void): void {
        let target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;
        const newsContainer = e.currentTarget;

        if (!target || !(newsContainer instanceof HTMLElement)) return;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<ResponseNews>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
