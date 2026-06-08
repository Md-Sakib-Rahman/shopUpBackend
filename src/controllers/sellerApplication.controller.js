const sellerService = require("../services/seller.service");
const { validateSellerApplication } = require("../validators/seller.validator");
const {getBody} = require("../utils/bodyParser");

async function applySeller(req, res) {
  try {
    const body = await getBody(req);

    const validation = validateSellerApplication(body);

    if (!validation.isValid) {
      res.statusCode = 400;

      return res.end(
        JSON.stringify({
          message: "Validation failed",
          errors: validation.errors,
        })
      );
    }
    
    const userId = req.user.userId;
    console.log(body)
    console.log(userId)
    const result = await sellerService.applySeller({
      userId,
      ...body,
    });

    res.statusCode = 201;

    return res.end(
      JSON.stringify({
        message: "Seller application submitted successfully",
        data: result,
      })
    );
  } catch (err) {
    res.statusCode = 400;

    return res.end(
      JSON.stringify({
        message: err.message,
      })
    );
  }
}

async function approveSeller(req, res) {
  try {
    const parts = req.url.split("/");
    const userId = parts[3];

    const result = await sellerService.approveSeller(userId);

    res.statusCode = 200;

    return res.end(
      JSON.stringify({
        message: result.message,
      })
    );
  } catch (err) {
    res.statusCode = 400;

    return res.end(
      JSON.stringify({
        message: err.message,
      })
    );
  }
}

async function rejectSeller(req, res) {
  try {
    const parts = req.url.split("/");
    const userId = parts[3];

    const body = await getBody(req);

    if (!body.reason) {
      res.statusCode = 400;

      return res.end(
        JSON.stringify({
          message: "Rejection reason is required",
        })
      );
    }

    const result = await sellerService.rejectSeller(
      userId,
      body.reason
    );

    res.statusCode = 200;

    return res.end(
      JSON.stringify({
        message: result.message,
      })
    );
  } catch (err) {
    res.statusCode = 400;

    return res.end(
      JSON.stringify({
        message: err.message,
      })
    );
  }
}

module.exports = {
  applySeller,
  approveSeller,
  rejectSeller,
};