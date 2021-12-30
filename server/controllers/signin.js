import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken' ;
import Compte from '../models/Compte.js' ;
import Admin from '../models/Administrateur.js' ;
import Client from '../models/Client.js' ;


export const signin = async(req,res) => {
    const { login ,password } = req.body;

    try {
        const existingCompte = await Compte.findOne({login});

        if(!existingCompte) return res.status(404).json({message : "Compte doesn't exist ."});

        const isPasswordCorrect = await bcrypt.compare(password,existingCompte.password);
        
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid password ."});
        console.log("from sign in",login,password);
        
        const existingCompteID=existingCompte._id;
        console.log(existingCompteID);
        const isClient = await Client.findOne({'compte':existingCompteID});
        if(!isClient){
            const isAdmin = await Admin.findOne({'compte':existingCompteID});
            const token = jwt.sign({login : existingCompte.login , id : existingCompte._id},'test' , {expiresIn : "1h"});
            res.status(200).json({result : isAdmin,token});
            console.log("from sign in : i am admin");
        }else
        {
            
            const token = jwt.sign({login : existingCompte.login , id : existingCompte._id},'test' , {expiresIn : "1h"});
            res.status(200).json({result : isClient,token});
            console.log("from sign in : i am client");
        }
    } catch (error) {
        res.status(500).json({message : 'Something went wrong. '});
    }
}
