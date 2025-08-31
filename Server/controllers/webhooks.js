import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Parse the raw body for verification
    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const bodyString = payload instanceof Buffer ? payload.toString() : JSON.stringify(payload);

    whook.verify(bodyString, headers);

    // Parse JSON if needed
    const event = JSON.parse(bodyString);
    const { data, type } = event;

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        break;
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }
    res.json({});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
