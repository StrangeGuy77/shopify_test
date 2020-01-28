import { Request, Response } from "express";
import * as moment from "moment";
import * as bcrypt from "bcryptjs";

export const storeQueryCallback = (req: Request, res: Response) => {
  const shop = req.query.shop;
  if (shop) {
    const state = moment().hours();
    const redirectUri = `${process.env.FORWARDING_ADDRESS}/shopify/callback`;
    const scope = "write_products";
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_KEY}&scope=${scope}&state=${state}&redirectUri=${redirectUri}`;

    const cryptSalt = bcrypt.genSaltSync(5);
    const cryptedState = bcrypt.hashSync(String(state), cryptSalt);
    res.cookie("state", cryptedState);
    res.redirect(installUrl);
  } else {
    res.status(400).json({
      message:
        "Shop param has not been provided. Please add ?shop=dev-shop.myshopify.com to your request"
    });
  }
};
