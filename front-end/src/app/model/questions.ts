export class Questions {
    constructor(
        public _id: string,
        public question_name: String,
        public answers: String[],
        public correct_answer: string,
        public question_type: string,
        public question_category: string
    ) {}

    static CreateDefault(): Questions {
        return new Questions('', '', [], '', '', '');
    }
}
