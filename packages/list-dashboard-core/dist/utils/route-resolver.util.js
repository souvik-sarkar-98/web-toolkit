/** Read reference-data resolver payload from the active route snapshot. */
export function readRouteRefData(route) {
    return route.snapshot.data['ref_data'] ?? {};
}
//# sourceMappingURL=route-resolver.util.js.map