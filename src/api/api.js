import { client } from "./client";

export const getAllQuestions = async () => {
    return await client.get('/question');
};

export const getQuestion = async (id) => {
    return await client.get(`/question/${id}`);
};

export const editQuestion = async (id, body) => {
    return await client.patch(`/question/${id}`, body);
};

export const deleteQuestion = async (id) => {
    return await client.delete(`/question/${id}`);
};

export const addQuestion = async (body) => {
    return await client.post('/question', body);
};

export const searchQuestion = async (body) => {
    return await client.post('/search_question', body)
}

// TODO Переделать на FORM-DATA
export const uploadFile = async (body) => {
    return await client.post('/uploader', body)
}

export const postComment = async (body) => {
    return await client.post('/comment', body)
}

export const getCommentsFromQuestion = async (id) => {
    return await client.post(`/comments/${id}`)
}

export const loadFile = async (name) => {
    return await client.get(`/uploads/${name}`)
}
