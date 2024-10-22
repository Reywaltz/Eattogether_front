import { redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({request, cookies}) => {
        const data = await request.formData()

        const username = data.get("username")
        const password = data.get("password")
        
        // todo validation
        
        const r = await fetch("http://192.168.1.78:8000/api/v1/login", {
            body: JSON.stringify(
                {"username": username, "password": password}
            ),
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        })
        
        if (r.status > 201) {
            console.log("error");
            console.log(r.status);
            console.log(r.body);
        }


        const token = await r.json()
        
        cookies.set('X-Auth-Token', token.token, {
            path: "/",
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            domain: "",
        })
        
        throw redirect(302, "/")
        
    }
}