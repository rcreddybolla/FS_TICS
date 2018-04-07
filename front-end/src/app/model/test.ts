
// Test Model
export class Test {
    constructor(
        public _id: string,
        public recruiter_id: string,
        public designation: string,
        public question_IDs: string[],
        public skills: string[]
    ) {}

    static CreateDefault(): Test {
        return new Test('', '', '', [], []);
    }
}
