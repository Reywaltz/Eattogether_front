import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({request, cookies}) => {
        const data = await request.formData()

        console.log(data.get('date'));
        
    }
}