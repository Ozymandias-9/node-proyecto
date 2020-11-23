module.exports = (req,res,next) =>{
    res.send(200).json({ code: 1, message: "Bienvenido al Pokédex"});
}