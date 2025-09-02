import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  console.log("Clerk webhook received");
  try {
    // 1. Verify the webhook signature using the raw body
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // If req.body is a Buffer, convert to string for JSON.parse
    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : req.body;

    whook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // 2. Parse the raw body
    let parsed;
    try {
      parsed = JSON.parse(rawBody);
    } catch (parseErr) {
      console.error("Failed to parse webhook body:", parseErr);
      return res.status(400).json({ success: false, message: "Invalid JSON body" });
    }

    const { data, type } = parsed;
    console.log("Webhook type:", type);

    // 3. Handle Clerk events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };
        try {
          const user = await User.create(userData);
          console.log("User created in DB:", user);
        } catch (dbErr) {
          if (dbErr.code === 11000) {
            // Duplicate key error (user already exists)
            console.warn("User already exists:", userData._id);
          } else {
            console.error("DB error on user.created:", dbErr);
            return res.status(500).json({ success: false, message: dbErr.message });
          }
        }
        return res.json({});
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };
        try {
          const updated = await User.findByIdAndUpdate(data.id, userData, { new: true });
          console.log("User updated in DB:", updated);
        } catch (dbErr) {
          console.error("DB error on user.updated:", dbErr);
          return res.status(500).json({ success: false, message: dbErr.message });
        }
        return res.json({});
      }
      case "user.deleted": {
        try {
          const deleted = await User.findByIdAndDelete(data.id);
          console.log("User deleted in DB:", deleted);
        } catch (dbErr) {
          console.error("DB error on user.deleted:", dbErr);
          return res.status(500).json({ success: false, message: dbErr.message });
        }
        return res.json({});
      }
      default:
        console.log("Unhandled Clerk webhook type:", type);
        return res.json({});
    }
  } catch (error) {
    // Signature verification or other error
    console.error("Webhook error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};