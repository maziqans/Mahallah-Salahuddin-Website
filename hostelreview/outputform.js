document.getElementById('form1').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('nama').value;
  var comment = document.getElementById('comment').value;

  var roomTypes = document.getElementsByName('room');
  var room = '';
  for (var i = 0; i < roomTypes.length; i++) {
      if (roomTypes[i].checked) {
          room += roomTypes[i].value + ' ';
      }
  }

  var outputDiv = document.createElement('div');
  outputDiv.innerHTML = 'Name: ' + name + '<br>' +
                        'Room: ' + room + '<br>' +
                        'Comment: ' + comment + '<br>';

  document.getElementById('output').appendChild(outputDiv);
});