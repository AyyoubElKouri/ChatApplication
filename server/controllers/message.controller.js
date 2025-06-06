import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;

        const senderId = req.user._id;
        console.log(senderId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([newMessage.save(), conversation.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {

        const {id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if(!conversation) req.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);


    } catch(error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}