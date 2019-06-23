const example = $('<div/>');
const header = $('.header');
example.css({
  height: 40,
  width: 100,
  outline: '1px solid red',
});
example.html('This is jQuery Example');
if (header) {
  header.after(example);
}
