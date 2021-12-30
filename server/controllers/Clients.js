import Client from  '../models/Client.js';
import Compte from  '../models/Compte.js';

import mongoose from 'mongoose';

export const getClients = async(req, res) => { 
    const Comptes=[],Logins=[],Passwords=[];
    try {
        const Clients = await Client.find();
                
        Clients.map((c)=>{
            const idcompte =c["compte"].toString();
            Comptes.push(idcompte);  
        });
        for(let i=0; i<Comptes.length; i++){
            let compte=await Compte.findById(Comptes[i]);
            Logins.push(compte['login']);
            Passwords.push(compte['password']);
        }
        res.status(200).json({Clients,Logins,Passwords});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getClient = async (req, res) => { 
    const { id } = req.params;

    try {
        console.log(id);
        const client = await Client.findById(id);
        
        res.status(200).json(client);
    } catch (error) {
        console.log("here");
        res.status(404).json({ message: error.message });
    }
}

export const createClient = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newReservation = new Reservation({ title, message, selectedFile, creator, tags })

    try {
        await newReservation.save();

        res.status(201).json(newReservation );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { nomclient, adresseclient, telclient, mailclient, login, password} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No client with id: ${id}`);

    const updatedClient = { creator, title, message, tags, selectedFile, _id: id };

    await Client.findByIdAndUpdate(id, updatedClient, { new: true });

    res.json(updatedClient);
}

export const deleteClient = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No client with id: ${id}`);

    await Client.findByIdAndRemove(id);

    res.json({ message: "Client deleted successfully." });
}


