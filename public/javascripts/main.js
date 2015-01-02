function loadHandle(){
    var handle = document.getElementById('handle').value;
    if (handle.length > 3){
        window.location.href = '/tweets/@' + handle;
    } else {
        alert("Please enter a valid Twitter handle");
    }
}
