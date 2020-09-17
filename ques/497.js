fnQues497 = function (objFromMainQues) {
    const windowScope = this; // global var (global to this function anyway)

    let quesVars = {
        varFV: uRand(20000,50000,1000),
        varRate: uRand(.08, .20, .01),
        varN: uRand(8, 20, 1),
        varPV: "??",
        get varY(){return this.varN} 
    };

    quesVars = addPrefix(quesVars, quesNum(true));
    if (objFromMainQues.isProduction) {return buildPage(fetchQuesVars(quesVars))} else {return buildPage(quesVars);}

    function buildPage(objQuesVars) { quesVars = objQuesVars; createEDVarInScope(quesVars, windowScope);
        
        let calcVars = {
            calcTheAns: varFV * (1 /((1+varRate)**varN))
        };
        createEDVarInScope(calcVars, windowScope);

        let displayVars = {
            dispRatePerc: uRound(varRate * 100, 0)
        };
        createEDVarInScope(displayVars, windowScope); jQuery.extend(quesVars, calcVars, displayVars); return fillPage();
    }

    function fillPage() {
        let obj = {};
        
        obj.ansBoxMessage = ansBoxMessages("writeOutNums");

        obj.stem = probDisplay(quesVars)`
        <p>
            You will receive a payment of \$varFV in varN years.
            What is the present value of the payment in today's dollars (at t=0),
            assuming a dispRatePerc% discount rate?
        </p>
        `;

        obj.solution = probDisplay(quesVars)`${explainPVSinglePmt_PV(quesVars)}`;

        return obj;
    } // end of fillPage

}
