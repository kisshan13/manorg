import User from "./schema.js";
import ClientSideError from "../../globals/classes/errors.js";


// Check Permission Pipeline responsible for checking if the user exists, and in an organization and have required permissions.
export const checkPermission = async ({organizationId, userId, permission}) => {
    const isUserExists = organizationId ?  await User.findById(userId).where({organizationId: organizationId}) : await User.findById(userId);

    if(!isUserExists) {

        throw new ClientSideError("No user Exists with that organization.")
    }

    if(!isUserExists.organizationId) {
        throw new ClientSideError("You're not in any organization");
    }

    if(isUserExists.permissions?.at(0) === "*") {
        return {
            result: true,
            message: 'Permission exists',
            user: isUserExists
        }
    }

    const isPermissionExists = isUserExists.permissions?.find((perm) => permission.includes(perm));

    if(!isPermissionExists) {
        throw new ClientSideError(`Missing permission to perform the action. Requires Permissions ${permission} any one.`, 400
        )
    }
}