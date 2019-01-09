const JWT = require('jsonwebtoken');
const Extraterrestre = require('../models/extraterrestre');
const { JWT_SECRET } = require('../configuration');

signToken = extraterrestre => {
  const token = JWT.sign({
    iss:'ghada',
    sub: extraterrestre.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res) => {
    // console.log('ExtraterrestresController.signUp called!');
    const { email, password } = req.body;
    console.log('email', req.body.email);

    // Check if there is a user with the same email
    const foundExtraterrestre = await Extraterrestre.findOne({ email });
     if (foundExtraterrestre) {
       return res.status(403).json({ error: 'email existe déja' });
     }

    const newExtraterrestre = new Extraterrestre({ email, password });
    await newExtraterrestre.save();

    //generate the token
    const token = signToken(newExtraterrestre);

    // response with token
    // res.json({ extraterrestre : 'created' });
    res.status(200).json({ token });
  },

  signIn: async (req, res) => {
    // console.log('ExtraterrestresController.signIn called!');
    // Generate token
    const token = signToken(req.extraterrestre);
    res.status(200).json({ token });
  },

  secret: async (req, res) => {
    // console.log('ExtraterrestresController.secret called!');
   console.log('I managed to get here!');
   res.json({ secret: "resource" });
  },

  getAllExtraterrestres: async (req, res) => {
      const extraterrestres = await Extraterrestre.find({});
      res.status(200).json(extraterrestres);
         // try {
          //   res.status(200).json({msg: 'hello'});
          // } catch (err) {
          //   res.status(404).json(err);
          // }
  },
  newExtraterrestre: async (req, res) => {
      const newExtraterrestre = new Extraterrestre(req.body);
      const extraterrestre = await newExtraterrestre.save();
      res.status(201).json(extraterrestre);
  },

  getSingleExtraterrestre: async (req, res) => {
    const { ExtId } = req.params;
    console.log('params', req.params)
    const extraterrestre = await Extraterrestre.findById(ExtId);
    res.status(200).json(extraterrestre);
 },
 updateExtraterrestre: async (req, res) => {
   //req.body may contain any number of fields
    const { ExtId } = req.params;
    const newExtraterrestre = req.body;
    // J'ai ajouter le {new: true} pour retourner l'extraterrestre aprés modification
    const result = await Extraterrestre.findByIdAndUpdate(ExtId, newExtraterrestre, {new: true});
    res.status(200).json(result);
 },
 deleteExtraterrestre: async (req, res) => {
   //req.body may contain any number of fields
    const { ExtId } = req.params;
    const newExtraterrestre = req.body;
    // J'ai ajouter le {new: true} pour retourner l'extraterrestre aprés modification
    const result = await Extraterrestre.findByIdAndRemove(ExtId);
    res.status(200).json({ msg: 'Deleted' });
 }
};
