module.exports.home = function(request, respond){
    return respond.render('home', {
        title: "home"
    });
}