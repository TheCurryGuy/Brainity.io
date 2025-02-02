import express from "express"; 
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { JWT_PASSWORD, GROQ_API } from "./config";
import { userMiddleware } from "./middleware";
import { randomHash } from "./utils";
import cors from "cors";
import { Groq } from 'groq-sdk';

const groqClient = new Groq({ apiKey: GROQ_API });
const app = express();
app.use(cors({
    origin: 'https://brainity.vercel.app'
}));

app.options('*', cors());
app.use(express.json());

////@ts-ignore was been used before now extended the request function thus not required anymore
declare global{
    namespace Express{
        export interface Request{
            userId: string
        }
    }
}

app.get("/", (req, res) => {

    res.json({
        message: "Brainity Server is alive!"
    })
})

app.post("/api/v1/signup",async (req,res) => {
    //todo: zod validation, hash the password
    const username = req.body.username;
    const password = req.body.password;

    try{
        await UserModel.create({
            username: username,
            password: password
        })
        res.json({
            message: "User Signed Up Successfully!"
        })
    }
    catch(error){
        res.sendStatus(403).json({
            message: "User already exists"
        })
    }
})

app.post("/api/v1/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userExists = await UserModel.findOne({
        username,
        password
    })
    if(userExists){
        if (!JWT_PASSWORD) {
            // Handle missing JWT_PASSWORD securely
            res.status(500).json({ message: "Internal Server Error: JWT_PASSWORD is not set" }); 
        } else{
            const token = jwt.sign({
                id: userExists._id
            },JWT_PASSWORD);
            res.json({
                token
            })
        }
        
    } else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
    
})

app.post("/api/v1/content", userMiddleware, async (req,res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const description = req.body.description;
    if(link === ""){
        await ContentModel.create({
            title,
            type,
            userId: req.userId,
            description
        })

    } else {
        await ContentModel.create({
            link,
            title,
            type,
            userId: req.userId,
            description
        })
    }
    
    res.json({
        message: "Content Added"
    })
    
})

app.get("/api/v1/content", userMiddleware, async (req, res)=>{
    const userId = req.userId
    const content = await ContentModel.find({
        userId: userId
    }) //this will populate the userId thus the response now will not only be having the userid stored but also the corresponding username that belongs to the mentioned userId as well this is what populate thus basically with references/foreign keys
    res.status(200).json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        _id: contentId,
    
        userId: req.userId
    })

    res.json({
        message: "Content Deleted Successfully"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;  // Now properly receives request body

    if (share) {
        try{
            const islinkOld = await LinkModel.findOne({
                userId: req.userId
            })
            if(islinkOld){
                res.json({
                    hash: islinkOld.hash
                })
            } else {
                const hashed = randomHash(8, req.userId);
                await LinkModel.create({
                    userId: req.userId,
                    hash: hashed
                });
                res.json({ hash: hashed });
            }
        } catch(e){
            res.json({
                message: "Error"
            })
        }
    } else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Old link Deleted successfully" });
    }
});


app.get("/api/v1/brain/:shareId", async (req,res) => {
    const hash = req.params.shareId;
    const link = await LinkModel.findOne({
        hash
    })
    if(!link) {
        res.status(411).json({
            message: "The Brain Your Looking For Does Not Exist 🫤"
        })
    } else{
        const content = await ContentModel.find({
            userId: link.userId
        })
        const user = await UserModel.findOne({
            _id: link.userId
        })
        if(!user){
            res.status(404).json({
                message: "User Not Found"
            }) 
            return;
        } 
        res.status(200).json({
            username: user.username,//as user can be null although thats imposible
            content: content 
        })
    }
})

app.post('/api/v1/chat', userMiddleware, async (req, res) => {
    const { query } = req.body;
    const userId = req.userId;
    try {
      // Fetch the user's content (Brain's memory)
      const contents = await ContentModel.find({ userId });
      const userName = await UserModel.findOne({
        _id: userId
      })
  
      if (contents.length === 0) {
        res.status(404).json({ response: "No data found in the Brain." });
        return
      }
  
      // Create a context from the content titles, descriptions, and links
      const context = contents
        .map((c) => {
          let contentInfo = `**Title:** ${c.title}\n\n**Description:** ${c.description}`;
          if (c.link) {
            contentInfo += `\n\n**Link:** [${c.link}](${c.link})`; // Markdown link format
          }
          return contentInfo;
        })
        .join('\n\n---\n\n'); // Add a separator between items
  
      // Create a prompt for the LLM
      const prompt = `
        You are ${userName?.username}'s Brain, a smart and friendly chatbot that helps answer questions based on the stored knowledge of ${userName?.username}'s Brain memory!

        **Memory Context:**
        ${context}

        **User Query:** ${query}

        ### **Guidelines:**
        - If the question is **related** to the stored memory, provide a clear and concise answer.
        - If the question is **unrelated**, respond with: "No data found in the Brain."
        - If a greeting is detected (e.g., "Hi," "Hello"), introduce yourself and say:  
        "Hello! I am ${userName?.username}'s Brain, your Brain assistant. How can I help you today?"
        - Format responses using Markdown for clarity.
        - If a relevant link is available, include it in Markdown format: [Link Text](URL).
        - Maintain a conversational and friendly tone while staying informative.
      `;
  
      // Generate a response using Groq's LLM
      const chatCompletion = await groqClient.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile", // Use an appropriate model
        temperature: 0.7,
        max_tokens: 150,
      });
  
      const response = chatCompletion.choices[0]?.message?.content || "No data found in the Brain.";
  
      res.json({ response });
    } catch (error) {
      console.error('Error processing chat query:', error);
      res.status(500).json({ response: "Failed to process your query." });
    }
});

app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})