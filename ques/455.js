fnQues455 = function (objFromMainQues) {


    let quesVars = {
        "varA": uRand(2, 8, 1),
        "varB": uRand(10, 29, 1),
        "varC": uRand(30, 50, 2)
    }


    quesVars = addPrefix(quesVars);
    if (objFromMainQues.isProduction) { return buildPage(fetchQuesVars(quesVars)) } else { return buildPage(quesVars) }

    function buildPage(objQuesVars) {
        quesVars = objQuesVars; createEDVarInScope(quesVars);

        let calcVars = {
            calcD: varC - varB,
            calcTheAns: ((varC - varB) / varA)
        }
        createEDVarInScope(calcVars);

        let displayVars = {};
        createEDVarInScope(displayVars);
        
        jQuery.extend(quesVars, calcVars, displayVars);
        storeQuesRespVars(quesVars, calcTheAns);
        return fillPage();
    }

    function fillPage() {
        let obj = {};

        obj.ansBoxMessage = ansBoxMessages("decimalPlaces4");

        obj.stem = probDisplay(quesVars)`
        Solve for \\(x\\) given:
        \\[ varAx + varB = varC \\]
        `;

        obj.solution = probDisplay(quesVars)`
        <p>
        Subtract ${varB} from each side. That will leave ${varA}x on the left side.
        Then, divide each side by ${varA} to isolate the variable
        </p>

        \\[
            \\begin{aligned}
            varAx + varB - varB &= varC - varB \\\\
            {} \\\\
            varAx &= calcD \\\\
            {} \\\\
            \\frac{varAx}{varA} &= \\frac{calcD}{varA} \\\\
            {}\\\\
            x &= calcTheAns
            \\end{aligned}
        \\] 

        `;
        return obj;

    } // end of fillPage
}

 // received from addOnPageSubmit
function fnQuesResp(objPageSubmit){
    const qtrxDivID = "#divQues" + objPageSubmit.strQuesNum;
    if (!(jQuery(`${qtrxDivID}-response`).length)){
        let objRespFeedback = objPageSubmit;
        return setEDQuesRespVars(objRespFeedback);
    }
}