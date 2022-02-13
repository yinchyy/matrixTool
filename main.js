let mat;
document.getElementById("createMatrix").addEventListener("click", () => {
    const x = window.prompt("Podaj x: ");
    const y = window.prompt("Podaj y: ");
    mat = new matrix(x, y);
    document.querySelector(".content").innerHTML = `<div class="matrixField"></div>
    <button id="transpose">Transponuj</button>`;
    const matrixField = document.querySelector(".matrixField");
    matrixField.style.width = `${x * 60}px`;
    for (let i = 0; i < x; ++i){
        for (let j = 0; j < y; ++j){
            let input = document.createElement("input");
            input.className = "matrixValue";
            input.type = "number";
            input.value = mat.getValue(i,j);
            matrixField.appendChild(input);
            input.addEventListener("change", () => {
                console.log(`${i},${j}: ${input.value}`)
                mat.setValue(i, j, input.value);
            });
        }
    }
    document.getElementById("transpose").addEventListener("click", () => {
        mat.transpose();
        if (matrixField.style.width === `${ y * 60 }px`) {
            matrixField.style.width = `${x * 60}px`;   
        } else {
            matrixField.style.width = `${y * 60}px`;   
        }
        let inputs = document.querySelectorAll("input");
        for (let i = 0; i < x; ++i){
            for (let j = i; j < x * y -1; j += parseInt(x)){
                console.log(`${i},${j}`);
                matrixField.insertBefore(matrixField.childNodes[i+j], matrixField.childNodes[i*x+(j/x)+i+1]);
            }
        }
        for (let i = 0; i < x; ++i) {
            for (let j = 0; j < y; ++j) {
                inputs[i * x + j].value = mat.getValue(i, j);
            }
        }
    });
});