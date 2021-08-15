//fetch to Json
let response = await fetch("./JS/data.json")
let data = await response.json();

/* on cré une constante pour réccupérer la liste des photographes du json*/
export let photographersList = data.photographers;


/******************************************DOM************************************************/

export const container = document.getElementById('container');


/*******************************************************************************/