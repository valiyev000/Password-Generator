const passwordText = document.getElementById("password-text")
const copyBtn = document.getElementById("copy-btn")
const lengthRange = document.getElementById("length-range")
const lengthDisplay = document.getElementById("length-display")
const allInputs = document.querySelectorAll(".options>input")
const allHistory = document.getElementById("all-history")
const resetBtn = document.getElementById("reset-btn")
const clearBtn = document.getElementById("clear-btn")



var historyArr = []


if (localStorage.getItem("locale-history")) {

    historyArr = JSON.parse(localStorage.getItem("locale-history"))


    for (let i = 0; i < historyArr.length; i++) {

        allHistory.innerHTML += `
            <div class="pressClass1">
            <span class="pressClass2">${historyArr[i]}</span>
            <img class="pressClass3" src="./imgs/copy-icon.svg" alt="copy-icon">
            </div>
        `

    }

}


function randomIndexGen(length) {
    let randomIndex = Math.round(Math.random() * (length - 1))
    // console.log("randomIndexCode",randomIndex); //TODO || PROB UCUN QOYULUB
    return randomIndex
}

function codeGenerator() {

    lengthDisplay.innerHTML = lengthRange.value
    let mainArr = []
    for (let i = 0; i < allInputs.length; i++) {

        if (allInputs[i].checked) {
            switch (i) {
                case 0:
                    // console.log("UPPERCASE SECILIB"); //TODO || PROB UCUN QOYULUB
                    mainArr = mainArr.concat(upperCaseArr)
                    break;
                case 1:
                    // console.log("LOWERCASE SECILIB"); //TODO || PROB UCUN QOYULUB
                    mainArr = mainArr.concat(lowerCaseArr)
                    break;
                case 2:
                    // console.log("NUMBERS SECILIB"); //TODO || PROB UCUN QOYULUB
                    mainArr = mainArr.concat(numsArr)
                    break;
                case 3:
                    // console.log("SYMBOLS SECILIB"); //TODO || PROB UCUN QOYULUB
                    mainArr = mainArr.concat(symbolArr)
                    break;

                default:
                    break;
            }
        }

    }

    

    if (mainArr.length !== 0) {
        resultPassword = ""

        for (let i = 0; i < lengthRange.value; i++) {

            resultPassword += mainArr[randomIndexGen(mainArr.length)]

        }

        passwordText.innerHTML = resultPassword
        historyArr.unshift(resultPassword)

        localStorage.setItem("locale-history", JSON.stringify(historyArr))

        // ! ----------------------------------SECOND VERSION-------------------------------------

        const newLog = document.createElement("div")
        newLog.setAttribute("class", "pressClass1")
        newLog.innerHTML = `
            <span class="pressClass2">${resultPassword}</span>
            <img class="pressClass3" src="./imgs/copy-icon.svg" alt="copy-icon">
        `
        allHistory.insertBefore(newLog, allHistory.firstChild)
    }



    // console.log("lengthRange.value", lengthRange.value) //TODO || PROB UCUN QOYULUB
    // console.log("passwordText.innerHTML",passwordText.innerHTML) //TODO PROB UCUN QOYULUB
    // console.log("passwordText.innerHTML.length",passwordText.innerHTML.length) //TODO PROB UCUN QOYULUB

}


const upperCaseArr = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"]
const lowerCaseArr = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
const numsArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const symbolArr = ["!", "@", "#", "$", "%", "^", "*", "(", ")", "_", "-", "+", "=", "`", "~", "[", "]", "{", "}", ";", ":", ",", ".", "/"];


lengthRange.addEventListener("input", () => {
    codeGenerator()
})

resetBtn.addEventListener("click", () => {
    codeGenerator()
})

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(passwordText.innerHTML)
    copyBtn.innerHTML = "Copied ;)"

    setTimeout(() => {
        copyBtn.innerHTML = "Copy Password_"
    }, 2000)

})

clearBtn.addEventListener("click", () => {

    allHistory.innerHTML = ""
    historyArr = []
    localStorage.setItem("locale-history", JSON.stringify(historyArr))


})



document.addEventListener("click", (e) => {

    switch (e.target.className) {
        case "pressClass1":
            navigator.clipboard.writeText(e.target.firstElementChild.innerHTML)
            e.target.style.boxShadow = "0px 0px 20px -5px rgba(255,255,255,0.87) inset"
            setTimeout(() => { e.target.style.boxShadow = "unset" }, 400)
            setTimeout(() => { alert(`${e.target.firstElementChild.innerHTML} kopyalandi!!!-by-parent-div`) }, 500)
            break;

        case "pressClass2":
            navigator.clipboard.writeText(e.target.innerHTML)
            e.target.parentElement.style.boxShadow = "0px 0px 20px -5px rgba(255,255,255,0.87) inset"
            setTimeout(() => { e.target.parentElement.style.boxShadow = "unset" }, 400)
            setTimeout(() => { alert(`${e.target.innerHTML} kopyalandi-by-SPAN`) }, 500)
            break;

        case "pressClass3":
            navigator.clipboard.writeText(e.target.previousElementSibling.innerHTML)
            e.target.parentElement.style.boxShadow = "0px 0px 20px -5px rgba(255,255,255,0.87) inset"
            setTimeout(() => { e.target.parentElement.style.boxShadow = "unset" }, 400)
            setTimeout(() => { alert(`${e.target.previousElementSibling.innerHTML} kopyalandi-by-ICON`) }, 500)
            break;

        default:
            break;
    }

})






