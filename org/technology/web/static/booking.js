let heading = document.createElement('h1');
heading.innerText = 'Welcome to bookings';
document.body.append(heading);

fetch('/app/booking/')
    .then(r=>r.json())
    .then(r=>{
        for(let b of r.bookings){
            let d = document.createElement('div');
            d.innerText = `${b.whn} made by ${b.who}`;
            document.body.append(d);
        }
    });

function deleteBooking(n){
    fetch(`/app/booking/${n}`,{method:['DELETE']});
}
let newBooking = document.createElement('div');
newBooking.innerHTML = `
<input id='who' placeholder='who' value='Carlos'><input id=whn type=date value='2024-11-29'><button id=go>Make a new booking</button>
`;
document.body.append(newBooking);

document.getElementById('go').onclick = ()=>{
    let payload = {who:document.getElementById('who').value,whn:document.getElementById('whn').value};
    fetch('/app/booking/',{method:'POST',body:JSON.stringify(payload),headers:{'content-type':'application/json'}})
        .then(r=>r.json())
        .then(r=>{
            if (!r.success)
                alert(r.msg);
            else{
                alert('OK');
            }
        })
}