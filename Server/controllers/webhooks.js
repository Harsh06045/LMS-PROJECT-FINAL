import { Webhook } from "svix";
import User from "../models/User.js";

//API Controller Function to manage clerk user with database

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const payloadString = req.body.toString();

        // Use the stringified payload for verification
        whook.verify(payloadString, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        // Parse the stringified payload
        const { data, type } = JSON.parse(payloadString);

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0]?.email_address || "",
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.create(userData);
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0]?.email_address || "",
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
        // Send a 200 OK response to acknowledge receipt of the webhook
        res.status(200).json({ success: true, message: 'Webhook processed' });

    } catch (error) {
        console.error("Error processing Clerk webhook:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}