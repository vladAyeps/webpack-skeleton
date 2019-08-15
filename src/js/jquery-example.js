const example = $('<div/>');
const header = $('.header');
example.css({
  paddingTop: 15,
  paddingBottom: 15,
  width: 250,
  textAlign: 'center',
  outline: '1px solid #000',
}).addClass('container');
example.html('Remember! Reality\'s an illusion, the universe is a hologram, buy gold! Byeeee!');
if (header) {
  header.after(example);
}
