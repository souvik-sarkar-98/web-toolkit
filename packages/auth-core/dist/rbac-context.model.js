export function contextFrom(entityType, entityId) {
    return { entityType, entityId };
}
export function findScopedAccess(snapshot, context) {
    return snapshot.scopedAccess.find((scope) => scope.entityId === context.entityId && scope.entityType === context.entityType);
}
function union(global, scoped) {
    return [...new Set([...global, ...(scoped ?? [])])];
}
export function effectivePermissions(snapshot, context) {
    if (!context) {
        return [...snapshot.permissions];
    }
    return union(snapshot.permissions, findScopedAccess(snapshot, context)?.permissions);
}
export function effectiveRoles(snapshot, context) {
    if (!context) {
        return [...snapshot.userRoles];
    }
    return union(snapshot.userRoles, findScopedAccess(snapshot, context)?.userRoles);
}
export function effectiveRoleGroups(snapshot, context) {
    if (!context) {
        return [...snapshot.roleGroups];
    }
    return union(snapshot.roleGroups, findScopedAccess(snapshot, context)?.roleGroups);
}
export function snapshotFromCurrentUser(dto) {
    return {
        idpSub: dto.idpSub,
        userId: dto.userId ?? dto.id,
        permissions: dto.permissions ?? [],
        userRoles: dto.userRoles ?? [],
        roleGroups: dto.roleGroups ?? [],
        scopedAccess: (dto.scopedAccess ?? []).map((scope) => ({
            entityId: scope.entityId,
            entityType: scope.entityType,
            permissions: scope.permissions ?? [],
            userRoles: scope.userRoles ?? [],
            roleGroups: scope.roleGroups ?? [],
        })),
    };
}
//# sourceMappingURL=rbac-context.model.js.map