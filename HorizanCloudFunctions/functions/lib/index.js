"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const answer_key_1 = require("./answer_key");
const scores_dict_1 = require("./scores_dict");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//url:
// https://us-central1-horizanapp-dae00.cloudfunctions.net/getUserResults
const handleUserData = (ans, scoreArray) => {
    //First parse array to get only the letter choices
    //Then take the letter choices and filter starting from the beginning
    //let numArr = [];
    const ansArray = [];
    for (let i = 0; i < ans.length; i++) {
        let line = ans[i];
        if (line != null) {
            if (Array.isArray(line)) { //if theres this then parse differently
                const tmpArray = [];
                for (let j = 0; j < line.length; j++) {
                    let temp = line[j].toString().split(". ");
                    tmpArray.push(temp[0]);
                }
                ansArray.push(tmpArray);
            }
            else {
                line = line.toString().split("\r\n");
                const tmpArray = [];
                for (let j = 0; j < line.length; j++) {
                    let temp = line[j].toString().split(". ");
                    tmpArray.push(temp[0]);
                }
                ansArray.push(tmpArray);
            }
        }
        else {
            console.log("undefined here");
            ansArray.push([""]);
        }
    }
    const numArray = [];
    for (let i = 0; i < ansArray.length; i++) {
        const arr = ansArray[i];
        const temp = [];
        for (let j = 0; j < arr.length; j++) {
            switch (arr[j]) {
                case "A":
                    temp.push(0);
                    break;
                case "B":
                    temp.push(1);
                    break;
                case "C":
                    temp.push(2);
                    break;
                case "D":
                    temp.push(3);
                    break;
                case "E":
                    temp.push(4);
                    break;
                case "F":
                    temp.push(5);
                    break;
                default:
                    temp.push(-1);
                    break;
            }
        }
        numArray.push(temp);
    }
    const matches = [];
    //Now filter by each question starting from 1
    for (const key of Object.keys(answer_key_1.answers)) {
        let temp = key.substring(1, key.length - 1);
        let ot = temp.split(", ");
        let t = ot.map(x => parseInt(x, 10));
        let matchRate = 0;
        for (let i = 0; i < t.length; i++) {
            if (numArray[i].includes(t[i])) {
                console.log("Matching!");
                matchRate++;
            }
        }
        if (matchRate > 4) {
            const ar2 = answer_key_1.answers[key];
            for (let i = 0; i < ar2.length; i++) {
                matches.push(ar2[i]);
            }
        }
    }
    const matches2 = [];
    const uSAT = parseInt(scoreArray[0], 10);
    const uACT = parseInt(scoreArray[1], 10);
    const scaledSAT = uSAT / 1600;
    const scaledACT = uACT / 36;
    if (scaledSAT >= scaledACT) {
        //Now filter by SAT
        const SATScores = scores_dict_1.scores["SAT_25th"];
        for (let i = 0; i < matches.length; i++) {
            //SAT
            if (SATScores[matches[i]] == 'NaN') {
                continue;
            }
            const score = parseInt(SATScores[matches[i]], 10);
            if (uSAT > score) {
                matches2.push(matches[i]);
            }
        }
    }
    else {
        //sort by act here
        const ACTScores = scores_dict_1.scores["ACT_25th"];
        for (let i = 0; i < matches.length; i++) {
            //ACT
            if (ACTScores[matches[i]] == 'NaN') {
                continue;
            }
            const score = parseInt(ACTScores[matches[i]], 10);
            if (uACT > score) {
                matches2.push(matches[i]);
            }
        }
    }
    return matches2;
    /*
        
        
        */
};
exports.getUserResults = functions.https.onRequest((request, response) => {
    const req = request.body;
    //const test = this[formMappings.questions[0]];
    const ansArray = [];
    const scoreArray = [];
    ansArray.push(req.q28_1); //Location
    ansArray.push(req.q29_2); //Environment
    ansArray.push(req.q30_5); //Gender
    ansArray.push(req.q31_6); //Public/Private
    ansArray.push(req.q16_whatsYour); //School Size
    ansArray.push(req.q18_whatsThe); //In-state Cost
    ansArray.push(req.q20_whatIs20); //Out of state cost
    scoreArray.push(req.q12_3); //SAT
    scoreArray.push(req.q32_whatIs); //ACT
    const tt = handleUserData(ansArray, scoreArray);
    response.send(tt);
});
//finally filter on SAT and ACT score, depending on which is better
//# sourceMappingURL=index.js.map