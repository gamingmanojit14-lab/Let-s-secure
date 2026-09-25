const API =
"https://let-s-secure.onrender.com";

async function verifyCert(){

const certText =
document
.getElementById(
"certificate"
)
.value;

const certificate =
JSON.parse(certText);

const res =
await fetch(
API +
"/api/verify-cert",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({
certificate
})
}
);

const data =
await res.json();

document
.getElementById(
"result"
)
.textContent =
JSON.stringify(
data,
null,
2
);

}
