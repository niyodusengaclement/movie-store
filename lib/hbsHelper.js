function hbsHelper(Handlebars) {
  Handlebars.registerHelper('movie', function () {
    // return `<td>${this.rating}</td>  <td>${this.timestamp}`;
    const date = new Date(this.timestamp);
    const day = `${date.getDate()}-${date.getMonth() + 1 }-${date.getFullYear()}`;

    
    return `<span data-feather="star"></span> ${this.rating} <span data-feather="clock"></span> Date: ${day}`;
});
}
module.exports = hbsHelper;