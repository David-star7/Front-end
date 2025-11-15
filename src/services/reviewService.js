
const API_URL = "http://localhost:3000/api/reviews";
const GAMES_API_URL = "http://localhost:3000/api/games";



export const getReviews = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener las reseñas");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createReview = async (reviewData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) throw new Error("Error al crear la reseña");
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getGamesForReview = async () => {
    try {
        const response = await fetch(GAMES_API_URL);
        if (!response.ok) throw new Error("Error al obtener juegos");
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error(error);
        return [];
    }
};