const API =
"https://let-s-secure.onrender.com/";

async function getCert(){

const certId =
document
.getElementById(
"certId"
)
.value;

const res =
await fetch(
API +
"/api/cert/" +
certId
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
