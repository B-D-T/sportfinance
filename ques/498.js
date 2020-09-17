fnQues498 = function (objFromMainQues) {
    const windowScope = this; // global var (global to this function anyway)

    let quesVars = {
        varFV: uRand(12500000,50000000,1000000),
        varRate: uRand(.05, .25, .01),
        varN: uRand(25, 40, 1),
        varPV: "??",
        get varY(){return this.varN}
    };

    quesVars = addPrefix(quesVars, quesNum(true));
    if (objFromMainQues.isProduction) {return buildPage(fetchQuesVars(quesVars))} else {return buildPage(quesVars);}

    function buildPage(objQuesVars) { quesVars = objQuesVars; createEDVarInScope(quesVars, windowScope);
        
        let calcVars = {
            calcGrowthRate: 1 + varRate,
            calcPVYear: varY-varN,
            calcFVIF: (1+varRate)**varN,
            get calcPVIF(){return 1/(this.calcFVIF)},
            get calcTheAns() {return varFV * this.calcPVIF}
        };
        createEDVarInScope(calcVars, windowScope);

        let displayVars = {
            dispRatePerc: uRound(varRate * 100, 0),
            dispGrowthRate: uRound(calcGrowthRate, 5),
            dispPVIF: uRound(calcPVIF, 5),
            dispFVIF: uRound(calcFVIF, 5),
            dispTheAns: uRound(calcTheAns, 0)
        };
        createEDVarInScope(displayVars, windowScope); jQuery.extend(quesVars, calcVars, displayVars); return fillPage();
    }

    function fillPage() {
        let obj = {};
        
        obj.ansBoxMessage = ansBoxMessages("writeOutNums");

        obj.stem = probDisplay(quesVars)`
            A pension liability will require payment of \$varFV, varN years
            from now. If the discount rate is dispRatePerc%, how much should be invested
            today to ensure the liability is exactly met?
        `;

        obj.solution = probDisplay(quesVars)`${explainPVSinglePmt_PV(quesVars)}

        <p>
            This answer means that we can put \$dispTheAns in an account today (year calcPVYear) and 
            it will grow at dispRatePerc% over the next varN years,
            eventually reaching \$varFV by the time we owe the pension payment.
            
            
        </p>

        `;

        return obj;
    } // end of fillPage

}
