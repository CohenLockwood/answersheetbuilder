function nexChoice(caller) {
    const parent = caller.parentElement;

    const current = parseInt(parent.getAttribute("data-selected"));
    const count = parent.childElementCount - 2;
    const next = (function() {
        if (current + 1 < count) return current + 1;
        else return 0;
    }) ();

    const child = parent.children;

    child[current + 1].style.display = "none";
    child[next + 1].style.display = child[next + 1].getAttribute("data-display");
    parent.setAttribute("data-selected", next)
}

function preChoice(caller) {
    const parent = caller.parentElement;

    const current = parseInt(parent.getAttribute("data-selected"));
    const count = parent.childElementCount - 2;
    const next = (function() {
        if (current - 1 >= 0) return current - 1;
        else return count - 1;
    }) ();

    const child = parent.children;

    child[current + 1].style.display = "none";
    child[next + 1].style.display = child[next + 1].getAttribute("data-display");
    parent.setAttribute("data-selected", next)
}

function addNewItem(caller) {
    addNewItemHere(caller.parentElement.querySelector(".items"));
}

function addNewItemHere(container) {
    const itemTemplate = document.getElementsByTagName("template")[0].content.getElementById("itemTemplate");
    const copyCat = itemTemplate.cloneNode(true);
    copyCat.removeAttribute("id");

    container.appendChild(copyCat);

    console.log(copyCat);
}

function addNewSection(caller) {
    const section = document.getElementById("answerSheetBuilder").getElementsByTagName("section")[0];
    const sectionTemplate = document.getElementsByTagName("template")[0].content.getElementById("sectionTemplate");
    const copyCat = sectionTemplate.cloneNode(true);
    copyCat.removeAttribute("id");

    const child = section.appendChild(copyCat);

    const sectionNum = "Section " + toRoman(section.childElementCount);

    child.getElementsByTagName('h2')[0].innerHTML = sectionNum;
    console.log(child.getElementsByTagName('h2')[0])
}

function toRoman(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function blacken(selection) {
    const sibling = selection.parentElement.childNodes;

    sibling.forEach(element => {
        unblacken(element);
    });

    selection.classList.add("blackened");
}

function unblacken(element) {
    element.classList -= "blackened";
}

let data = {
    sections: [{
        title: '',
        time: 0,
        items: 0
    }]
}

function writeData() {
    const answerSheetBuilder = document.getElementById("answerSheetBuilder");

    const section = answerSheetBuilder.getElementsByTagName("section")[0].getElementsByTagName("div")[0];
    data.sections[0].title = section.querySelector("#sectionTitle").value;
    data.sections[0].time = parseInt(section.querySelector("#time").value);
    data.sections[0].items = parseInt(section.querySelector("#itemNo").value);

    answerSheetBuilder.style.display = "none";

    showTestProper();
}

function showTestProper() {
    const testProper = document.getElementById("testProper");

    const section = testProper.getElementsByTagName("section")[0];
    
    section.querySelector("h1").innerHTML = data.sections[0].title;

    testProper.style.display = "block";
}