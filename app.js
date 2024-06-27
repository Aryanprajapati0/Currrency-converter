const BASE_URL="https://v6.exchangerate-api.com/v6/2e186355a690957a347419b1/latest";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");



// for (code in countryList)
//   {
//     console.log(code,countryList[code]);
// }


for(let select of dropdowns){
    for (currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected="selected";
        } else if(select.name === "to" && currcode === "INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
     });
}

// const updateExchangeRate= async()=>{
//     let amount=document.querySelector(".amount input");
//     let amtval=amount.value;
//     if(amtval===""|| amtval<1){
//      amtval="1";
//      amount.value="1";
//     }
//  //    console.log(fromcurr.value,tocurr.value);
//     const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
//     let response= await fetch(URL);
//     let data= await response.json();
//     let rate=data[tocurr.value.toLowerCase()];
    
 
//     let finalamount=amtval * rate;
//     msg.innerText=`${amtval} ${fromcurr.value}=${finalamount} ${tocurr.value}`;
// }



const updateflag = (element) =>{ 
   let currcode=element.value;
   let countrycode = countryList[currcode];
   let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newsrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    console.log(fromcurr.value)

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    console.log(amtVal)

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromcurr.value}`;

    let response = await fetch(URL);

    // if (!response.ok) {
    //     throw new Error('Network response was not ok');
    // }

    let data = await response.json();
    let rate = data.conversion_rates[tocurr.value];

    let finalAmount = amtVal * rate;
    msg.innerText =` ${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
});

// window.addEventListener("load",()=>{
//     updateExchangeRate();
//  });


