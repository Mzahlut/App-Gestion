import Client from '../models/client.model.js';


export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    return res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error on getting clients', error });
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    console.log('ID recibido:', req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    return res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error on getting client', error });
  }
};

export const createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ message: 'Error on creating client', error });
  }
};


export const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: 'Error on updating client', error });
  }
};


export const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error on deleting client', error });
  }
};

