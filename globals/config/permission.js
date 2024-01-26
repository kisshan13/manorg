const invitePermission = {
    create: "INVITE-CREATE",
    edit: "INVITE-EDIT",
    delete: "INVITE-DELETE",
    manage: "INVITE-MANAGE",
}

const departmentPermission = {
    create: "DEPARTMENT-CREATE",
    edit: "DEPARTMENT-EDIT",
    delete: "DEPARTMENT-DELETE",
    manage: "DEPARTMENT-MANAGE",
    manageSingle: "DEPARTMENT-MANAGE-SINGLE",
    manageMultiple: "DEPARTMENT-MANAGE-MULTIPLE"
}

const PERMISSION = {
    invite: invitePermission,
    department: departmentPermission,
};

export  default  PERMISSION
