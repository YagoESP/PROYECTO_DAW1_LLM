export class ApiService {
    constructor(http, endpoint) {
        this.http = http;
        this.endpoint = endpoint;
    }
    
    getAll() { 
        return this.http.get(this.endpoint); 
    }
    
    getById(id) { 
        return this.http.get(`${this.endpoint}/${id}`); 
    }
    
    create(data) { 
        return this.http.post(this.endpoint, data); 
    }
    
    update(id, data) { 
        return this.http.put(`${this.endpoint}/${id}`, data); 
    }
    
    delete(id) { 
        return this.http.delete(`${this.endpoint}/${id}`); 
    }
}
