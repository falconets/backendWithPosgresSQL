import busRoutes from "./busRoutes.js";
import busStops from "./busStops.js";
import routeStops from "./routeStops.js";
export default {
  ...busRoutes,
  ...busStops,
  ...routeStops
};
