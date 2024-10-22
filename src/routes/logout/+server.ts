import { redirect } from '@sveltejs/kit'

export const POST = async ({cookies}) => {
    console.log(cookies.get('X-Auth-Token'));
    
    cookies.delete('X-Auth-Token', {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        domain: "",
    })
    //TODO signout in backend (fetch)
    throw redirect(303, '/login')
}