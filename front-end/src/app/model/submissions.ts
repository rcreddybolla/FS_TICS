export class Submissions {
    
    constructor(
        public _id: string,
        public test_id: string,
        public question_id : string,
        public candid_id: string,
        public answer_given: string,
        public isCorrect: Boolean
    ){} 

    static CreateDefault(): Submissions {
        return new Submissions('', '', '', '', '',false);
    }

}