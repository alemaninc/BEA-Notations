function parse(x) {
  if (x=="beta") return N("1.3063389e2135")
  return N(x)
}
window.setInterval(function(){
  document.getElementById("output").innerHTML = gformat(parse(document.getElementById("number").value),document.getElementById("precision").value,document.getElementById("notation").value)
},50)
