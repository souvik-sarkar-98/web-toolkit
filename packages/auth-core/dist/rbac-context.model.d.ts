export interface RbacEntityContext {
    entityId: string;
    entityType: string;
}
export interface RbacAccessSnapshot {
    permissions: string[];
    userRoles: string[];
    roleGroups: string[];
}
export interface RbacScopedAccessSnapshot extends RbacAccessSnapshot, RbacEntityContext {
}
/** Client-side snapshot of resolved RBAC */
export interface RbacUserAccessSnapshot extends RbacAccessSnapshot {
    idpSub: string;
    userId?: string;
    scopedAccess: RbacScopedAccessSnapshot[];
}
export type CurrentUserRbacDto = {
    idpSub: string;
    userId?: string;
    id?: string;
    permissions?: string[];
    userRoles?: string[];
    roleGroups?: string[];
    scopedAccess?: Array<{
        entityId: string;
        entityType: string;
        permissions?: string[];
        userRoles?: string[];
        roleGroups?: string[];
    }>;
};
export declare function contextFrom(entityType: string, entityId: string): RbacEntityContext;
export declare function findScopedAccess(snapshot: RbacUserAccessSnapshot, context: RbacEntityContext): RbacScopedAccessSnapshot | undefined;
export declare function effectivePermissions(snapshot: RbacUserAccessSnapshot, context?: RbacEntityContext): string[];
export declare function effectiveRoles(snapshot: RbacUserAccessSnapshot, context?: RbacEntityContext): string[];
export declare function effectiveRoleGroups(snapshot: RbacUserAccessSnapshot, context?: RbacEntityContext): string[];
export declare function snapshotFromCurrentUser(dto: CurrentUserRbacDto): RbacUserAccessSnapshot;
//# sourceMappingURL=rbac-context.model.d.ts.map