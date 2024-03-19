import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    conversation.messages.push(newMessage._id);
    await conversation.save();

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller : ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMessages(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages controller : ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// export async function sendMessage(req, res) {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: [senderId, receiverId],
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }
//     const newMessage = new Message({ senderId, receiverId, message });
//     // await newMessage.save();
//     await newMessage.save();
//     conversation.messages.push(newMessage._id);

//     // if (newMessage) {
//     //   await newMessage.save();
//     //   conversation.messages.push(newMessage._id);
//     // }
//     await conversation.save();
//     // await Promise.all([conversation.save(), newMessage.save()]);

//     return res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller : ", error.message);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// export async function getMessages(req, res) {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;
//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] },
//     }).populate("messages");
//     if (!conversation) {
//       return res.status(200).json([]);
//     }
//     return res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.log("Error in getMessages controller : ", error.message);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
