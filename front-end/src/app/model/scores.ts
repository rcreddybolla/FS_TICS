export class Scores {
    
    constructor(
        public _id: string,
        public candid_id: string,
        public candid_name: string,
        public test_id: string,
        public score: string
    ){} 

    static CreateDefault(): Scores {
        return new Scores('','','', '', '');
    }

}