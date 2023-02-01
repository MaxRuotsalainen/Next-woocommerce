const API_URL = 'https://shop-interview.acrowd.se/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_4c0d8a4f83c78831c200e39d1f371e92d419d863';
const CONSUMER_SECRET = 'cs_1eb6c96b9a32942b52a868da3ad28698b15873ff';

const headers = {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`),
};

export async function getFeaturedProducts() {
    const response = await fetch(`${API_URL}/products`, { headers });
    const data = await response.json();
    return data;
}

export async function getProducts(category) {
    const response = await fetch(`${API_URL}/products?category=${category}`, { headers });
    const data = await response.json();
    return data;
}

export async function getProduct(slug) {
    const response = await fetch(`${API_URL}/products?slug=${slug}`, { headers });
    const data = await response.json();
    return data;
}

export async function getCategories() {
    const response = await fetch(`${API_URL}/products/categories`, { headers });
    const data = await response.json();
    return data;
}

export async function getOrders() {
    const response = await fetch(`${API_URL}/orders`, { headers });
    const data = await response.json();
    return data;
}

export async function createOrder(order) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            ...headers,
        },
        body: JSON.stringify(order),
    });
    const data = await response.json();
    return data;
    }
