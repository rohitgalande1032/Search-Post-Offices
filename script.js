document.addEventListener("DOMContentLoaded", async ()=> {
    let ipAddress = document.querySelector(".ip-address");
    let ipAddress2 = document.querySelector(".ip-address2");
    let response = await fetch("https://ipinfo.io/json");
    data = await response.json()
    console.log(data)
    initMap(data.loc)
    moreInfo(data)
    searchPostOffices(data.postal);
    ipAddress.innerHTML = data.ip;
    ipAddress2.innerHTML = data.ip;
    fetchUser(data.ip)
})


async function fetchUser(IP) {
    console.log(IP);
    let response = await fetch(`https://ipapi.co/${IP}/json/`);
    let data = await response.json();
    console.log(data);

    renderHead(data);
}

// Add Head Section
function renderHead(data) {
    let head = document.querySelector(".head-info");
    head.innerHTML += `
                <div>
                    <label>Lat: <span >${data.latitude}</span></label>
                    <label>City: <span ></span>${data.city}</label>
                    <label>Organization: <span">${data.org}</span></label>
                </div>
                <div>
                    <label>Long: <span>${data.longitude}</span></label>
                    <label>Region: <span >${data.region}</span></label>
                    <label>Hostname: <span >${data.ip}</span></label>
                </div>    
                `
}


function moreInfo(data) {
    let moreInfo = document.getElementById("more-info");
    //find date and time by using timezone
    let datetime_str = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });
    
    moreInfo.innerHTML = `
            <h2 style="text-align: center;">More Information About You</h2>
            <label>Time Zone: <span>${data.timezone}</span></label><br>
            <label>Date and Time: <span>${datetime_str}</span></label><br>
            <label>Pincode: <span>${data.postal}</span></label><br>
    `
}

// Add Map using latitude and longitude
function initMap(latlong) {
    document.getElementById("map-container").innerHTML = `
    <iframe src="https://maps.google.com/maps?q=${latlong}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0"></iframe>
`
}

//Search Post Offices
async function searchPostOffices(pincode) {
    console.log(pincode)
    let response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    let data = await response.json();
    console.log(data);

    let postOffices = document.querySelector(".post-offices");
    postOffices.innerHTML = `
         <h1>Message: <span>${data[0].Message}</span></h1>
        <input type="text" id="search" placeholder="Search by name..."></input>
        <div class="post-office-list">
        </div>
        
    `
    renderPostOffice(data[0].PostOffice);
   filterPostOffices(data[0].PostOffice);
    
}

function renderPostOffice(postOffice) {
    postOffice.map((office) => {
        document.querySelector(".post-office-list").innerHTML += `
            <div class="post-office">
                <h2>Name :  <span>${office.Name}</span></h2>
                <h2>Branch Type : <span>${office.BranchType}</span></h2>
                <h2>Delivery Status : <span>${office.DeliveryStatus}</span></h2>
                <h2>District  : <span>${office.District}</span></h2>
                <h2>Division : <span>${office.Division}</span></h2>
            </div>
        `
        })
}

function filterPostOffices(postOffice) {
    document.getElementById("search").addEventListener("input", () => {
        let searchValue = document.getElementById("search").value.toLowerCase();
        let postOffices = document.querySelector(".post-office-list");
        postOffices.innerHTML = "";
        postOffice.map((office) => {
            if (office.Name.toLowerCase().includes(searchValue)) {
                postOffices.innerHTML += `
                <div class="post-office">
                <h2>Name :  <span>${office.Name}</span></h2>
                <h2>Branch Type : <span>${office.BranchType}</span></h2>
                <h2>Delivery Status : <span>${office.DeliveryStatus}</span></h2
                <h2>District  : <span>${office.District}</span></h2>
                <h2>Division : <span>${office.Division}</span></h2>
                </div>
                `
                }
                })
    })
    
}

document.getElementById("search-btn").addEventListener("click", () => {

    document.querySelector(".container").style.display = "none";
    let content1 = document.querySelector(".main-sec1")
    let content2 = document.querySelector(".main-sec2")

    content1.style.display = "block";
    content2.style.display = "block";

})