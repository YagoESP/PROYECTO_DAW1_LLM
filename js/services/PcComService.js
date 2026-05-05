export default class PcComService {
    static async getArticles() {
        const response = await fetch("http://localhost:8000/api/products");
        const data = await response.json();
        console.log(data);
        return data;
    }
    static async getCategories() {
        const response = await fetch("http://localhost:8000/api/categories");
        const data = await response.json();
        console.log(data);
        return data;
    }
    
}