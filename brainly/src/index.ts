import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { UserMiddleware } from "./middleware";
import { Request } from "express";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup" , async(req , res)=>{
  
    const username = req.body.username;
    const password = req.body.password;
    try{
        await UserModel.create({
        username:username,
        password:password
    })
    
    res.json({
        message:"User Signed Up"
    })
    }catch(e){
        res.status(411).json({
            message:"User already exits"
        })
    }
  

})

app.post("/api/v1/signin", async (req , res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if(existingUser){
        const token = jwt.sign({
            id:existingUser._id
        },JWT_PASSWORD)

        res.json({
            token
        })
        
    }else{
        res.status(403).json({
            message :"Incorrect Crediantails"
        })
    }
    
})

app.post("/api/v1/content", UserMiddleware ,async(req , res)=>{
    const link =req.body.link;
    const type =req.body.type;
    await ContentModel.create({
        link,
        type,
        title:req.body.title,
        //userId: new mongoose.Types.ObjectId(req.userId),
       userId:req.userId,
        tags :[]
    })

    res.json({
        message :"Content added"
    })

    
})

app.get("/api/v1/content",UserMiddleware, async(req , res)=>{
    
    const userId = req.userId;
    const content = await ContentModel.find({

            userId:userId
     }).populate("userId","username") //want to acc username and it we should use
     .lean();
     res.json({
        content
     })
    
})

app.delete("/api/v1/content",UserMiddleware,async(req , res)=>{
    const contentId = req.body.ContentId;
    await ContentModel.deleteMany({
        contentId,
        
        userId:req.userId
    })
    res.json({
        message :"Deleted"
    })

    
})

app.post("/api/v1/brain/share",UserMiddleware, async(req , res)=>{
    const share = req.body.share;
    console.log("userId in route:", req.userId); // 👈 Add this

    if(share){
        const existingLink = await LinkModel.findOne({
            userId:req.userId
        });
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            userId: req.userId,
            hash:hash
        })
    res.json({
        hash
    })
}else{
    await LinkModel.deleteOne({
        userId: req.userId
    });
     res.json({
            message: "Link deleted"
        });
}
});
app.get("/api/v1/brain/:shareLink", async(req , res)=>{
    const hash = req.params.shareLink;
    
    console.log(hash);
    
    const link = await LinkModel.findOne({
        hash
    });
    if(!link){
        res.status(411).json({
            message:"Sorry incorrect input"
        })
        return;
    }
    //userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId

        })
        if(!user){
            res.status(411).json({
                message:"User not found,error should ideadly not hppended"
            })
            return;
        }
        res.json({
            username: user.username,
            content : content
        })
    })

   
app.listen(3000);



