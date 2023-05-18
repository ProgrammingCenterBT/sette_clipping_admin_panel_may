export class RolesAndRights {
    roles_and_rights_id: number;
    roles_and_rights_status: string;
    permission: {
        permission_id: number,
        permissions_name: string;
    }
    role: {
        role_id: number;
        name_of_role: string;
    }
}