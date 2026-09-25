const API =
"https://let-s-secure.onrender.com";

async function generateCert(){

const owner =
document.getElementById("owner").value;

const project =
document.getElementById("project").value;

const domain =
document.getElementById("domain").value;

const email =
document.getElementById("email").value;

const res =
await fetch(
API + "/api/request-cert",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({
owner,
project,
domain,
email
})
}
);

const data =
await res.json();

document
.getElementById("result")
.textContent =
JSON.stringify(
data,
null,
2
);

}
