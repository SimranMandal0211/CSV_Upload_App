// middleware to set res locals flash
module.exports.setFlash = (request, respond, next) => {
    respond.locals.flash = {
        'success' : request.flash('success'),
        'error' : request.flash('error')
    }

    next();
}