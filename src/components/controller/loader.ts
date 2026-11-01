class Loader {
    private baseLink: string;
    private mockLink: string;
    private options: { [key: string]: string };
    constructor(baseLink: string, mockLink: string, options: { [key: string]: string }) {
        this.baseLink = baseLink;
        this.mockLink = mockLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: { endpoint: string; options?: { [key: string]: string } },
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler(res: Response, isRetry: boolean): Response {
        if (!res.ok) {
            if (res.status === 429 && isRetry) {
                throw new Error(`Error ${res.status}: Too Many Requests (Mock failed too)`);
            } else if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
                throw Error(res.statusText);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { [key: string]: string }, endpoint: string, isRetry: boolean = false): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${!isRetry ? this.baseLink : this.mockLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    async load<T>(
        method: string,
        endpoint: string,
        callback: (data: T) => void,
        options: { [key: string]: string } = {},
        isRetry: boolean = false
    ): Promise<void> {
        try {
            const res = await fetch(this.makeUrl(options, endpoint, isRetry), { method });
            if (res.status === 429) {
                if (isRetry) {
                    throw new Error(`429 Too Many Requests on mocks`);
                } else {
                    console.log('429 on API. Retrying with mocks...');
                    return this.load<T>(method, endpoint, callback, options, true);
                }
            }

            this.errorHandler(res, isRetry);

            const data = (await res.json()) as T;
            callback(data);
        } catch (err) {
            console.error(err);
        }
    }
}

export default Loader;
