def representation_question(question):
    return {
        "id": question.id,
        "question": question.question,
        "answers": question.answers,
        "media_uuid": question.media_uuid
    }