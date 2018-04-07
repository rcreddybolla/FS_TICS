
// Create your data model here

export class Candidate {
    
    constructor(
        public _id: string,
        public candid_name: string,
        public candid_email: string,
        public candid_phone: string,
        public candid_phone2: string,
        public no_of_exp: number,
        public dob: Date,
        public gender: string,
        public pref_loc: string,
        public recruiter_id: string,
        public test_id: string,
        public hasPassed: boolean
    ){} 

    static CreateDefault(): Candidate {
        return new Candidate('', '', '', '', '', 0 ,new Date(''), '', '', '', '', false);
    }

}