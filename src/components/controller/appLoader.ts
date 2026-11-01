import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL as string, process.env.API_MOCK_URL as string, {
            apiKey: process.env.API_KEY as string,
        });
    }
}

export default AppLoader;
