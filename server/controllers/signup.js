import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Compte from '../models/Compte.js';
import Admin from '../models/Administrateur.js';
import Client from '../models/Client.js';

export const signup = async(req,res) => {
    const{nomClient,adresseClient,telClient,mailClient,login,password}=req.body;
    try {
        
        const existingCompte = await Compte.findOne({login});
        
        if(existingCompte) return res.status(400).json({message : "Compte already exists ."});

        const hashedPassword = await bcrypt.hash(password,12);
        bcrypt.
        console.log(nomClient);
        console.log(mailClient);
        const newCompte = await Compte.create({ login,password:hashedPassword});
        
        const newClient = await Client.create({nomclient:nomClient,adresseclient:adresseClient,telclient:telClient,mailclient:mailClient ,compte:newCompte._id });
        const token = jwt.sign({login : newCompte.login , id : newCompte._id},'test' , {expiresIn : "1h"});

        res.status(200).json({result : newClient,token});    
    
        

    } catch (error) {
        res.status(500).json({message : 'Something went wrong. '});
    }
}