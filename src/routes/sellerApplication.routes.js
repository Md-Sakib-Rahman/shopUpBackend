const sellerController = require("../controllers/sellerApplication.controller");
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")
async function sellerRoutes(req, res) {
  if (req.method === "POST" && req.url === "/api/seller-application/apply") {
    const authenticated = await authMiddleware(req, res);

    if (!authenticated) return;
    return sellerController.applySeller(req, res);
  }

  if (
    req.method === "POST" &&
    req.url.startsWith("/api/seller/") &&
    req.url.endsWith("/approve")
  ) {
    const authenticated = await authMiddleware(req, res);

    if (!authenticated) return;
    return sellerController.approveSeller(req, res);
  }

  if (
    req.method === "POST" &&
    req.url.startsWith("/api/seller/") &&
    req.url.endsWith("/reject")
  ) {
    const authenticated = await authMiddleware(req, res);

    if (!authenticated) return;

    const authorized = await roleMiddleware(req, res, [userRoles.ADMIN]);

    if (!authorized) return;
    return sellerController.rejectSeller(req, res);
  }

  res.statusCode = 404;
  res.end(
    JSON.stringify({
      message: "Seller route not found",
    }),
  );
}

module.exports = sellerRoutes;
