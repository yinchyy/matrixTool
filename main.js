let mat;
document.getElementById("createMatrix").addEventListener("click", () => {
    const x = window.prompt("Podaj x: ");
    const y = window.prompt("Podaj y: ");
    mat = new matrix(x, y);
    document.querySelector(".content").innerHTML = `<div class="matrixField"></div>
    <button id="transpose">Transponuj</button>`;
    const matrixField = document.querySelector(".matrixField");
    //matrixField.style.width = `${x * 60}px`;
    matrixField.innerHTML += `<div class="matrixSet"></div>`.repeat(x);
    let target = document.querySelectorAll(".matrixSet");
    for (let i = 0; i < x; ++i){
        for (let j = 0; j < y; ++j){
            let input = document.createElement("input");
            input.className = "matrixValue";
            input.type = "number";
            target[i].appendChild(input);
            input.value = mat.getValue(i,j);
            input.addEventListener("change", () => {
                console.log(`${i},${j}: ${input.value}`)
                mat.setValue(i, j, input.value);
            });
        }
    }
    document.getElementById("transpose").addEventListener("click", () => {
        mat.transpose();
        const settings = new Array();
        let style = `
        .matrixField{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            flex: 1 1;
        }
        .matrixSet{
            flex:1;
            display: flex;
            flex-direction: column;
        }
        `;
        if (document.querySelector("style").innerHTML.includes(style)) {
            settings[0] = "wrap";
            settings[1] = "row";
        }
        else {
            settings[0] = "wrap";
            settings[1] = "column";
        }
        document.querySelector("style").innerHTML = `
        .matrixField{
            display: flex;
            flex-direction: row;
            flex-wrap: ${settings[0]};
            flex: 1 1;
        }
        .matrixSet{
            flex:1;
            display: flex;
            flex-direction: ${settings[1]};
        }
        .matrixSet>input{
            flex: 1;
        }
         `;
    });
});