 module.exports = function(permittedRoles) {
     return function(req, res, next) {
         const user = req.user
         let ispermitted = false
         permittedRoles.map((role) => {
             if (user.role.includes(role)) {
                 ispermitted = true
             }
         })
         if (!ispermitted) {
             return res.status(403).send({ message: "Permisson denied" })
         }
         return next()
     }
 }