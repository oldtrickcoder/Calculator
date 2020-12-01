// bagian input number

const $input = document.querySelector("input");

document.querySelectorAll(".num__key").forEach(
    el => {
        el.onclick = () => $input.value = $input.value !== "0" ? $input.value + el.innerText: el.innerText;
    }
)


// Bagian operasi matematika

const buffer = [];
const opCallback = opName => () =>{
// parseFloat digunakan merubah integer menjadi desimal
    let currentval = parseFloat($input.value);
// untuk tombol persentase
    if(opName === "percent"){
        currentval *= 0.01;
        $input.value = currentval;
    }else{
        if (buffer && buffer.length){
            buffer.push({ value: currentval });
            const result = evaluate(buffer);
            buffer.push({ value: result });
            buffer.push({ value: opName });
            $input.value="";
        }
     else{
         buffer.push({ value: currentval});
         buffer.push({ value: opName});
         $input.value = "";
     }
    }


}
const evaluate = buffer=>{
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;
switch(operator){
    case "add":
        return firstOperand + secondOperand;
        break;
        case "subtract":
            return firstOperand - secondOperand;
            break;
            case "multiply":
                return firstOperand * secondOperand;
                break;
                case "divide":
                    return firstOperand / secondOperand;
                    break;
    default:
        return secondOperand;                             
}


};

for (const opName of  ["add","subtract","multiply","divide","percent"]){
    document.querySelector(`.op__key[op=${opName}]`).onclick = opCallback(opName);
}

// end bagian opearasi matematika
// di bawah ini untuk fungsi samadengan atau equals

document.querySelector(".eq__key").onclick = () =>{
    if (buffer &&  buffer.length){
        buffer.push({ value: parseFloat($input.value)});
        $input.value = evaluate(buffer);
    }
}

// dibagian bawah ini untuk tombol CLEAR atau C
document.querySelector(".op__key[op=clear]").onclick = () =>{
    $input.value = 0;
    buffer.length = 0;
}

// DIBAWAH INI UNTUK TOMBOL POSITIF NEGATIF
document.querySelector(".op__key[op=negate]").onclick = () =>{
    ($input.value = -parseFloat($input.value));
}