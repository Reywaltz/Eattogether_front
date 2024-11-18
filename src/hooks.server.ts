import { redirect, type Handle, type RequestEvent } from "@sveltejs/kit";
import { NO_AUTH_ROUTES } from "./routes";
import { jwtDecode } from "jwt-decode";

export const handle: Handle = async ({ event, resolve }) => {
    const user = authenticateUser(event)

    event.locals.user = user
    
    if (!user && !NO_AUTH_ROUTES.includes(event.route.id)) {
      throw redirect(303, "/login")
    }

    return await resolve(event);
  };

function authenticateUser(event: RequestEvent) {
  const cookies = event.cookies.get("X-Auth-Token")
  
  if (!cookies) {
    return null    
  }

  const decoded_data = jwtDecode(cookies)

  const user = {
    id: decoded_data.user_id,
    roles: decoded_data.roles,
  }

  return user
}