import express from "express"; 
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { randomHash } from "./utils";
import cors from "cors"

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


app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})