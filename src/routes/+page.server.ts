export async function load({fetch, cookies, locals}) {
    const r = await fetch("http://192.168.1.78:8000/api/v1/places", {
        credentials: "include",
        headers: {
            "Content-type": "application/json",
            "Cookies": `X-Auth-Token:${cookies.get('X-Auth-Token')}`
        }
    })
    
    if (r.status > 201) {
        console.log("error");
        console.log(r.status);
        console.log(r.body);
    }

    const items = await r.json();

    return items
        
}