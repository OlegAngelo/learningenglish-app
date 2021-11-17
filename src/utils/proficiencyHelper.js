export const sortByStatus = (questions) => {
    var master = [];
    var inProgress = [];
    var notTried = [];

    for(const question of questions) {
        if (!question.user_proficiency_vocabularies || question.user_proficiency_vocabularies.length < 1) {
            notTried.push(question);
        } else if (question.user_proficiency_vocabularies[0].training_vocabularies_status_id == 1) {
            master.push(question);
        } else if (question.user_proficiency_vocabularies[0].training_vocabularies_status_id == 2) {
            inProgress.push(question);
        } else {
            notTried.push(question);
        }
    }

    return [...master, ...inProgress, ...notTried];
};
