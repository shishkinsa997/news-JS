export default class Storage {
    static save(key: string, value: unknown): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static load<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
}