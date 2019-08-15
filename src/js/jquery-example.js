const example = $('<div/>');
const header = $('.header');
example.css({
  paddingTop: 15,
  paddingBottom: 15,
  width: 250,
  textAlign: 'center',
  outline: '1px solid #000',
}).addClass('container');
example.html('Reality is an illusion, the universe is a hologram, buy gold, bye!');
if (header) {
  header.after(example);
}
