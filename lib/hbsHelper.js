function hbsHelper(Handlebars) {
  Handlebars.registerHelper('movie', function () {
    // return `<td>${this.rating}</td>  <td>${this.timestamp}`;
    const date = new Date(this.timestamp);
    const day = `${date.getMonth() + 1 }-${date.getDate()}-${date.getFullYear()}`;

    
    return `<span data-feather="star"></span> ${this.rating} <span data-feather="clock"></span> Date: ${day}`;
});
}
module.exports = hbsHelper;