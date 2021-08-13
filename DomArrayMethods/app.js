// Add user button
const addUser = document.querySelector('.btn1');
// Double money button
const doubleMoney = document.querySelector('.btn2');
// Show only millionares button
const showMillionares = document.querySelector('.btn3');
// Sort by richest button
const sortByRichest = document.querySelector('.btn4');
// Calculate entire wealth button
const calculateEntireWealth = document.querySelector('.btn5');

// Person and wealth box 
const personAndWealthBox = document.querySelector('.personAndWealthBox');

const totalWealth = document.querySelector('.result');



// Remove result on every button click if it exists
const removeResult = () => {
    Array.from(personAndWealthBox.children).forEach(child => {
        if (child.classList.contains('result')) {
            child.remove();
        }
    })
}



// Add click event listener to ADD USER button, fetch the data and show in UI START
const fetchNames = async () => {

    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data
}

const showInUI = (data) => {
    const fullName = `${data.name.first} ${data.name.last}`
    const wealth = Math.round(Math.random(0) * 1200000)
    
    const html = `
        <div class="pwBox">
            <div class="person">${fullName}</div>
            <div class="wealth">$${wealth}</div>
        </div>
    `

    personAndWealthBox.innerHTML += html;
}

addUser.addEventListener('click', () => {
    removeResult();
    //Fetch end return data 
    fetchNames().then(data => {
        showInUI(data.results[0]);
    });
})
// Add click event listener to ADD USER button, fetch the data and show in UI END




// Add click event on DOUBLE MONEY button and map thrue each wealth element and double the wealt START
doubleMoney.addEventListener('click', () => {
    removeResult();
     Array.from(personAndWealthBox.children).map(child => {
        let wealthWithDollar = child.firstChild.nextSibling.nextSibling.nextSibling.innerText;
        wealthWithDollar = parseInt(wealthWithDollar.substring(1));
        wealthWithDollar = wealthWithDollar * 2;
        child.firstChild.nextSibling.nextSibling.nextSibling.innerText = `$${wealthWithDollar}`;
    })
})
// Add click event on DOUBLE MONEY button and map thrue each wealth element and double the wealt END



// Add click event on SHOW ONLY MILLIONARES button loop thrue every wealth and if it les than one million delete it
showMillionares.addEventListener('click', () => {
    removeResult();
    Array.from(personAndWealthBox.children).map(child => {
        console.log(child);
        let wealthWithDollar = child.firstChild.nextSibling.nextSibling.nextSibling.innerText;
        wealthWithDollar = parseInt(wealthWithDollar.substring(1));
        if (wealthWithDollar < 1000000) {
            child.remove();
        }
    })
})
// Add click event on SHOW ONLY MILLIONARES button loop thrue every wealth and if it les than one million delete it



// Add avent listener to SORT BY RICHEST button on sort them START
sortByRichest.addEventListener('click', () => {
    const sorted = Array.from(personAndWealthBox.children).sort((a, b) => {
        a = a.firstChild.nextSibling.nextSibling.nextSibling.innerText;
        a = parseInt(a.substring(1));
        b = b.firstChild.nextSibling.nextSibling.nextSibling.innerText;
        b = parseInt(b.substring(1));

        return b - a;
    })

    personAndWealthBox.innerHTML = ``;

    sorted.forEach(one => {
        const person = one.firstElementChild.innerText;
        const wealth = one.firstElementChild.nextSibling.nextSibling.innerText

        personAndWealthBox.innerHTML += `
            <div class="pwBox">
                <div class="person">${person}</div>
                <div class="wealth">${wealth}</div>
            </div>
        `
    })
    
})
// Add avent listener to SORT BY RICHEST button on sort them END



// Add click event to CALCULATE THE ENTIRE WEALTH BUTTON and calculate the entire wealth and show  in UI START
calculateEntireWealth.addEventListener('click', () => {
    let total = 0;
    Array.from(personAndWealthBox.children).forEach(child => {
        if (!child.classList.contains('result')) {
        let wealthWithDollar = child.firstChild.nextSibling.nextSibling.nextSibling.innerText;
        wealthWithDollar = parseInt(wealthWithDollar.substring(1));
        total += wealthWithDollar;
        }
    })
    
    personAndWealthBox.innerHTML += `
    <div class="result">
        <div class="totalWealth">Total Wealth:</div>
        <div class="wealthResult">$${total}</div>
    </div>
    `

    total = 0;
})
// Add click event to CALCULATE THE ENTIRE WEALTH BUTTON and calculate the entire wealth and show  in UI END



// On restart START
for (i = 0; i < 3; i++) {
    fetchNames().then(data => {
        showInUI(data.results[0]);
    })
}
// On restart END

console.log('lmao buraz');
